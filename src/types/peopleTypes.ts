export enum Sex {
    Male = "Male",
    Female = "Female",
}

export interface Person {
    age: number,
    hair_colour: string,
    height: number,
    name: string,
    sex: Sex,
    societies: string[],
    student_id: string,
    subject: string,
    year: number
  }