import { hasValue, isNotFutureDate, isValidDate, isLessThan, isLessThanOrEqualTo, isGreaterThan, isGreaterThanOrEqualTo, isEqualTo, isNotEqualTo, isShorterThan, matchesPattern } from "./ValidationUtils";
import { stringContains } from './UIUtils';

enum TokenErrorType {
    unexpected = "Unexpected",
    unrecognized = "Unrecognized"
}

enum TokenType {
    number = 'number',
    operator = 'operator',
    identifier = 'identifier',
    ClosingParen = ")",
    OpeningParen = "(",
    Comma = ",",
    Equals = "=",
    Compare = "==",
    End = "(end)",
    string = "string"
}

interface Token {
    type: string;
    value: any;
    position: number;
}

interface Symbol {
    name: string;
    led: (symbol: Symbol) => Symbol;
    nud: (symbol: Symbol) => Symbol;
    lbp: number;
    type: string;
    value: any;
}

class Lexer {
    position: number;
    input: string;
    tokens: Token[];
    current: string;

    constructor() {
        this.position = 0;
        this.input = '';
        this.tokens = [];
        this.current = '';
    }

    private isOperator(lexeme: string) {
        return /[+\-*\/\^%=(),]/.test(lexeme);
    }

    private isDigit(lexeme: string): boolean {
        return /[0-9]/.test(lexeme);
    }

    private isString(lexeme: string) {
        return /[\'\"]/.test(lexeme);
    }

    private isWhitespace(lexeme: string): boolean {
        return /\s/.test(lexeme);
    }

    private isIdentifier(lexeme: string): boolean {
        return !this.isOperator(lexeme)
            && !this.isDigit(lexeme)
            && !this.isWhitespace(lexeme)
            && !this.isString(lexeme);
    }

    private isLogicalOperator(lexeme: string): boolean {
        return /[AND,OR]/.test(lexeme);
    }

    private advance(): string {
        this.current = this.input[++this.position];

        return this.current;
    }

    private addToken(type: string, value: any, position: number) {
        this.tokens.push({ type, value, position });
    }

    private peek(): string {
        return this.input[this.position + 1];
    }

    private eatWhitespace(): void {
        while (this.isWhitespace(this.advance()));
    }

    private eatDigit() {
        this.eatToken(this.isDigit.bind(this), TokenType.number);
    }

    private eatIdentifier() {
        this.eatToken(this.isIdentifier.bind(this), TokenType.identifier);
    }

    private eatOperator() {
        this.eatToken(this.isOperator.bind(this));
    }

    private eatString() {
        let lexeme = '';
        const startingPosition = this.position;

        this.advance();

        while (!this.isString(this.current) || this.current === TokenType.End) {
            lexeme += this.current;
            this.advance();
        }

        this.advance();

        this.addToken(TokenType.string, lexeme, startingPosition);
    }

    private eatToken(predicate: (lexeme: string) => boolean, tokenType?: TokenType) {
        let lexeme = this.current;
        const startingPosition = this.position;

        while (predicate(this.advance())) {
            lexeme += this.current;
        }

        this.addToken(tokenType || lexeme, lexeme, startingPosition);
    }

    private setInput(input: string) {
        this.input = `${input} `;
        this.current = input[0];
    }

    public getTokens(input: string) {

        this.setInput(input);

        while (this.peek()) {
            if (this.isWhitespace(this.current)) {
                this.eatWhitespace();
                continue;
            }
            if (this.isOperator(this.current)) {
                this.eatOperator();
                continue;
            }
            if (this.isDigit(this.current)) {
                this.eatDigit();
                continue;
            }
            if (this.isString(this.current)) {
                this.eatString();
                continue;
            }
            if (this.isIdentifier(this.current)) {
                this.eatIdentifier();
                continue;
            }
            //default case
            throw new Error('Unrecognized token: ' + this.current);
        }

        this.addToken(TokenType.End, TokenType.End, this.position);
        return this.tokens;
    }
}

class Parser {
    symbolTable: any;
    position: number;
    tokens: Token[];
    current!: Token;

    constructor() {
        this.symbolTable = {};
        this.position = 0;
        this.tokens = [];

        this.buildExpression = this.buildExpression.bind(this);

        this.addEqualsSupport();
        this.addIdentifierSupport();
        this.addNumberSupport();
        this.addParenSupport();
        this.addStringSupport();

        this.addPrefix("-", 7);
        this.addInfix("^", 6, 5);
        this.addInfix("*", 4);
        this.addInfix("/", 4);
        this.addInfix("%", 4);
        this.addInfix("+", 3);
        this.addInfix("-", 3);

        this.addInfix("==", 9, 9);

        this.addSymbol(",");
        this.addSymbol(")");
        this.addSymbol(TokenType.End);
    }

    private getSymbol(): Symbol {
        const proto = this.symbolTable[this.current.type];

        if (proto === undefined) {
            this.raiseError(TokenErrorType.unrecognized);
        }

        return Object.assign(
            Object.create(proto),
            {
                value: this.current.value,
                type: this.current.type
            });
    }

    private advance() {
        this.current = this.tokens[++this.position];

        return this.current;
    }

    private raiseError(type: TokenErrorType) {
        throw new Error(`${type} token: ${this.current.type} at ${this.current.position}`);
    }

    private verifyClosingParen() {
        if (this.current.type !== TokenType.ClosingParen) {
            throw new Error(`Expeceted closing paren: ')' but found: ${this.current.value}`);
        }
    }

    private verifyLed(symbol: Symbol) {
        if (symbol.led === undefined) {
            this.raiseError(TokenErrorType.unexpected);
        }
    }

    private verifyNud(symbol: Symbol) {
        if (symbol.nud === undefined) {
            this.raiseError(TokenErrorType.unexpected);
        }
    }

    private buildExpression(rbp: number) {
        let symbol = this.getSymbol();
        let left: Symbol;

        this.verifyNud(symbol);

        this.advance();

        left = symbol.nud(symbol);

        while (rbp < this.getSymbol().lbp) {
            symbol = this.getSymbol();

            this.advance();

            this.verifyLed(symbol);

            left = symbol.led(left);
        }

        return left;
    }

    private addSymbol(name: string, nud?: any, lbp?: number, led?: any) {
        const current = this.symbolTable[name];

        if (current === undefined) {
            this.symbolTable[name] = {
                type: name,
                nud,
                lbp,
                led
            };
            return;
        }

        current.lbp = current.lbp || lbp;
        current.lbp = current.nud || nud;
        current.lbp = current.led || led;
    }

    private addInfix(name: string, lbp: number, rbp: number = 0, led?: any) {
        const defaultLed = (left: any) => {
            return {
                type: name,
                left,
                right: this.buildExpression(rbp)
            };
        };

        this.addSymbol(name, undefined, lbp, led || defaultLed);
    }

    private addPrefix(name: string, rbp: number) {

        this.addSymbol(name, () => {
            return {
                type: name,
                right: this.buildExpression(rbp)
            };
        });
    }

    private addNumberSupport() {
        this.addSymbol(TokenType.number, (number: any) => number);
    }

    private addStringSupport() {
        this.addSymbol(TokenType.string, (str: any) => str);
    }

    private addIdentifierSupport() {
        this.addSymbol(TokenType.identifier, (name: any) => {

            if (this.current.type === TokenType.OpeningParen) {
                let args = [];

                this.advance();

                //needs to be removed typescript is getting confused
                this.current = this.current;

                if (this.current.type !== TokenType.ClosingParen) {

                    args.push(this.buildExpression(2));

                    while (this.current.type === TokenType.Comma) {
                        this.advance();
                        args.push(this.buildExpression(2));
                    }

                    this.verifyClosingParen();
                }

                this.advance();

                return {
                    type: 'call',
                    args,
                    name: name.value
                };
            }

            return name;

        });
    }

    private addParenSupport() {
        this.addSymbol(TokenType.ClosingParen);

        this.addSymbol(TokenType.OpeningParen, () => {
            const value = this.buildExpression(2);

            this.verifyClosingParen();

            this.advance();

            return value;
        });
    }

    private addEqualsSupport() {
        this.addSymbol(TokenType.Equals, 1, 2, (left: any) => {
            if (left.type === 'call') {
                left.args.map((arg: any) => {
                    if (arg.type !== 'identifier') {
                        throw new Error('Invalid argument name');
                    }
                });

                return {
                    type: 'function',
                    name: left.name,
                    args: left.args,
                    value: this.buildExpression(2)
                };
            }

            if (left.type === 'identifier') {
                return {
                    type: 'assign',
                    name: left.value,
                    value: this.buildExpression(2)
                };
            }

            throw new Error("Invalid value for: " + left);

        });
    }

    private setTokens(tokens: Token[]) {
        this.tokens = tokens;
        this.current = tokens[0];
    }

    public getTree(tokens: Token[]) {

        this.setTokens(tokens);

        const tree = [];

        while (this.current.type !== TokenType.End) {
            tree.push(this.buildExpression(0));
        }

        return tree;
    }
}

class Evaluator {
    operators: any;
    variables: any;
    functions: any;
    args: any;

    constructor(operators: any, variables: any, functions: any) {
        this.operators = operators;
        this.variables = variables;
        this.functions = functions;
        this.args = {};
    }

    private parseNode(node: any): any {
        const parseNode = this.parseNode.bind(this);

        switch (node.type) {
            case "==":
                return this.parseNode(node.left) == this.parseNode(node.right);
            case TokenType.number:
                return parseInt(node.value);
            case TokenType.string:
                return node.value;
            case TokenType.identifier:
                // const value = this.args[node.value] || this.variables[node.value];

                // if (value === undefined) {
                //     throw new Error(node.value + ' is undefined');
                // }

                // return value;
                return node.value;

            case 'assign':
                this.variables[node.name] = parseNode(node.value);
                break;

            case 'call':
                return this.functions[node.name].apply(null, node.args.map((arg: any) => parseNode(arg)));

            case 'function':
                let args = this.args;

                this.functions[node.name] = function () {
                    node.args.map(function (arg: any, index: number) {
                        args[node.args[index].value] = arguments[index];
                    });

                    const result = parseNode(node.value);
                    args = {};

                    return result;
                };

            default:

                if (this.operators[node.type]) {
                    if (node.left) {
                        return this.operators[node.type](
                            parseNode(node.left),
                            parseNode(node.right));
                    }
                    return this.operators(node.type)(
                        parseNode(node.right));
                }
        }

    }

    public evaluate(tree: any) {
        let output = '';

        const parseNode = this.parseNode.bind(this);

        tree.map((node: any) => {
            const value = parseNode(node);
            if (value !== undefined) {
                output += value + "\n";
            }
        });

        return output;
    }
}

class Interpreter {

    lexer: Lexer;
    parser: Parser;
    evaluator!: Evaluator;
    operators: any;
    variables: any;
    functions: any;
    resource: any;
    aliases: any;

    constructor(operators: any, variables: any, functions: any, answers: any, aliases: any) {
        this.lexer = new Lexer();
        this.parser = new Parser();

        this.functions = functions;

        this.resource = answers;

        this.aliases = aliases;

        this.setAnswers(answers);
    }

    public eval(rule: string) {
        const tokens = this.lexer.getTokens(rule);

        const tree = this.parser.getTree(tokens);

        const evaluation = this.evaluator.evaluate(tree);

        this.lexer = new Lexer();
        this.parser = new Parser();

        return evaluation;
    }

    public evaluate(id: any, operator: any, args: any) {

        try {
            var resourceValue = this.resource[id];
            var functionKey = this.aliases[operator];
            var functionValue = this.functions[functionKey];
            var evaluation = "";
            if (Array.isArray(resourceValue)) {
                for (var i = 0; i < resourceValue.length; i++) {
                    evaluation = functionValue(resourceValue[i], args)
                    if (evaluation === "true") break;
                }
            }
            else evaluation = functionValue(resourceValue, args);
            switch(evaluation) {
                case "true":
                    return 1;
                case "false":
                    return 0;
                default:
                    return -1;
            }
        } catch (e) {
            return -1;
        }


    }

    private mapOperatorToFunction(operator: string) {
        switch(operator) {
            case "=":
            break;
            case "!=":
            break;
            case ">":
            break;
            case "<":
            break;
            case "IN":
            break;
            case "NOT IN":
            break;
        }
    }

    public setAnswers(answers: any) {
        const functions = Object.assign({}, this.functions, {
            getAnswerByQuestionId: function (id: string) {
                return answers[id];
            }
        });

        this.evaluator = new Evaluator(this.operators, this.variables, functions);
    }
}

const operators = {
    "+": function (a: any, b: any) {
        return parseInt(a) + parseInt(b);
    },
    "-": function (a: any, b: any) {

        if (typeof b === "undefined") {
            return -a;
        }

        return a - b;
    },
    "*": function (a: any, b: any) {
        return a * b;
    },
    "/": function (a: any, b: any) {
        return a / b;
    },
    "%": function (a: any, b: any) {
        return a % b;
    },
    "^": function (a: any, b: any) {
        return Math.pow(a, b);
    }
};


export default function createDefaultInterpreter(answers:any, functions = {}, aliases = {}) {
    return new Interpreter(operators, {}, functions, answers, aliases);

}

