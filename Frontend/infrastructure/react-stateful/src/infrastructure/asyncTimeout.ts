export default function asyncTimeout(delay: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, delay);
    });
}