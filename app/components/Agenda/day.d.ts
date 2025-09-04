declare module "aday.json" {
  const aday: Array<TDaySchema>;
  export default aday;
}

declare module "bday.json" {
  const bday: Array<TDaySchema>;
  export default bday;
}

export type TDaySchema = {
    _id: string,
    rosterID: number,
    personID: number,
    structureID: number,
    calendarID: number,
    schoolID: number,
    courseID: number,
    sectionID: number,
    courseName: string,
    courseNumber: string,
    isResponsive: boolean,
    sectionNumber: string,
    endYear: number,
    schoolName: string,
    trialID: number,
    trialActive: boolean,
    roomName: string,
    teacherDisplay: string,
    hideStandardsOnPortal: boolean,
    crossSiteSection: boolean,
    crossSiteStudent: boolean,
    sectionPlacements: TSectionPlacements[],
    _model: string,
    _hashCode: string
};

export type TSectionPlacements = {
    _id: string,
    sectionID: number,
    termID: number,
    termName: string,
    termSeq: number,
    periodID: number,
    trialID: number,
    periodSequence: number,
    term: TTerm,
    periodScheduleID: number,
    periodName: string,
    periodScheduleName: string,
    teacherDisplay: string,
    periodScheduleSequence: number,
    structureID: number,
    courseID: number,
    courseNumber: string,
    sectionNumber: number,
    courseName: string,
    termScheduleID: number,
    crossSiteSection: boolean,
    startDate: string,
    endDate: string,
    unitAttendance: boolean,
    attendance: boolean,
    isResponsive: boolean,
    _model: string,
    _hashCode: string
};

export type TTerm = {
    _id: string,
    termID: number,
    termScheduleID: number,
    seq: number,
    startDate: string,
    endDate: string,
    stateCode: string,
    termName: string,
    structureID: number,
    isPrimary: boolean,
    termScheduleName: string,
    calendarID: number,
    scheduleStructureName: string,
    _model: string,
    _hashCode: string
};
