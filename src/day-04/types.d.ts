/**
 * Elves have been assigned the job of cleaning up sections of the camp. Every
 * section has a unique ID number, and each Elf is assigned a range of section IDs.
 *
 * @param l - the lower number of the sections to be cleaned
 * @param h - the higher number of the sections to be cleaned
 */
interface SectionAssignment {
  l: number;
  h: number;
}

type Pair = SectionAssignment[];

type Day04Input = Pair[];
