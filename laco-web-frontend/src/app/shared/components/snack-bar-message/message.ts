export class MessageSnack {
    constructor(
        public readonly messageClass: string, 
        public readonly message: string,
        public readonly duration: number
    ) {}
}