import HttpStatus from "http-status-codes";

export class ApiError implements Error {

    public static Forbidden(): void {
        throw new ApiError(HttpStatus.FORBIDDEN, "Insufficient privileges.");
    }

    public static ItemNotFound(): void {
        throw new ApiError(HttpStatus.NOT_FOUND, "No resource found that matches the given id.");
    }

    public status: number;
    public message: string;
    public name: string;

    // tslint:disable-next-line:no-unnecessary-initializer
    public constructor(status: number, message: string | object, name: string = undefined) {
        this.status = status;
        this.message = message as string;
        this.name = name ? name : this.constructor.name;
    }

}
