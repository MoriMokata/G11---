export interface MedicalRecordInterface {
    ID: number,
    Hospital_Number:    string,
	Personal_ID:    string,
	Patient_Name:	string,
	Patient_Age:	number,
	Patient_Dob: Date,
	Patient_Tel:	string,
	Register_Date: Date,
}

export interface LabresultInterface {
    ID: number,
	MedicalTechID:  number,
	MedicalTech: MedicalTechInterface,
    MedicalRecordID:    number,
	MedicalRecord: MedicalRecordInterface,
    LabTypeID:  number,
	LabType: LabTypeInterface
    Lab_Result: string,
	Lab_Detail: string,
	LabRoomID:  number,
	LabRoom: LabRoomInterface,
	AddedTime:  Date
}

export interface LabRoomInterface {
    ID: number,
	Name:	string,
	Building:	string,
	floor:  number
}

export interface LabTypeInterface {
    ID: number,
	Name:	string,
}

export interface MedicalTechInterface {
    ID: number,
	Name:	string,
	Email:	string,
	Pass:  string
}