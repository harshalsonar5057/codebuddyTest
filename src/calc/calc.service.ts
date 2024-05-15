import { BadRequestException, Injectable } from '@nestjs/common';
import { CalcDto } from './calc.dto';

@Injectable()
export class CalcService {
  calculateExpression(calcBody: CalcDto): number | never {
    const { expression } = calcBody;

    try {
      const result = this.evaluateExpression(expression);
      if (Number.isNaN(result)) {
        throw new BadRequestException('Invalid expression provided');
      }
      return result;
    } catch (error) {
      throw new BadRequestException(
        'Invalid expression provided',
        error.message,
      );
    }
  }

  private evaluateExpression(expression: string): number {
    const tokens = this.tokenizeExpression(expression);
    const postfixTokens = this.convertToPostfix(tokens);
    return this.evaluatePostfix(postfixTokens);
  }

  private tokenizeExpression(expression: string): string[] {
    // Split expression into tokens (numbers, operators)
    const tokenized = expression.match(/[+\-*/()]|\d+/g);
    if (!tokenized || tokenized.join('') !== expression) {
      throw new Error('Invalid expression');
    }
    return tokenized;
  }

  private convertToPostfix(infixTokens: string[]): string[] {
    const precedence: { [key: string]: number } = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
    };

    const output: string[] = [];
    const operators: string[] = [];

    for (const token of infixTokens) {
      if (!isNaN(parseFloat(token))) {
        // Token is a number, add to output
        output.push(token);
      } else if (token in precedence) {
        // Token is an operator
        while (
          operators.length &&
          operators[operators.length - 1] !== '(' &&
          precedence[operators[operators.length - 1]] >= precedence[token]
        ) {
          output.push(operators.pop() as string);
        }
        operators.push(token);
      } else if (token === '(') {
        // Left parenthesis
        operators.push(token);
      } else if (token === ')') {
        // Right parenthesis
        while (operators.length && operators[operators.length - 1] !== '(') {
          output.push(operators.pop() as string);
        }
        if (operators.length && operators[operators.length - 1] === '(') {
          operators.pop();
        }
      }
    }

    // Pop all remaining operators from the stack to output
    while (operators.length) {
      const topOperator = operators.pop() as string;
      if (topOperator === '(' || topOperator === ')') {
        throw new Error('Mismatched parentheses');
      }
      output.push(topOperator);
    }

    return output;
  }

  private evaluatePostfix(postfixTokens: string[]): number {
    const stack: number[] = [];

    for (const token of postfixTokens) {
      if (!isNaN(parseFloat(token))) {
        // Token is a number, push to stack
        stack.push(parseFloat(token));
      } else {
        // Token is an operator
        const operand2 = stack.pop() as number;
        const operand1 = stack.pop() as number;

        switch (token) {
          case '+':
            stack.push(operand1 + operand2);
            break;
          case '-':
            stack.push(operand1 - operand2);
            break;
          case '*':
            stack.push(operand1 * operand2);
            break;
          case '/':
            if (operand2 === 0) {
              throw new Error('Division by zero');
            }
            stack.push(operand1 / operand2);
            break;
          default:
            throw new Error(`Invalid operator: ${token}`);
        }
      }
    }

    if (stack.length !== 1) {
      throw new Error('Invalid expression');
    }

    return stack.pop() as number;
  }
}
