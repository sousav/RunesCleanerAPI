export class ApiError implements Error {

    // tslint:disable-next-line:no-unnecessary-initializer
    constructor(public status: number, public message: any, public name: string = undefined) {
        if (!this.name) {
            this.name = this.constructor.name
        }
    }

    static ItemNotFound() {
        throw new ApiError(404, "No resource found that matches the given id.")
    }

    static Forbidden() {
        throw new ApiError(403, "Insufficient privileges.")
    }
}
