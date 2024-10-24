class Film {
    // Properties
    private title: string;
    private director: string;
    private releaseYear: number;

    // Constructor
    constructor(title: string, director: string, releaseYear: number) {
        this.title = title;
        this.director = director;
        this.releaseYear = releaseYear;
    }

    // Methods
    public getTitle(): string {
        return this.title;
    }

    public getDirector(): string {
        return this.director;
    }

    public getReleaseYear(): number {
        return this.releaseYear;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public setDirector(director: string): void {
        this.director = director;
    }

    public setReleaseYear(releaseYear: number): void {
        this.releaseYear = releaseYear;
    }
}