import { MedicalRecordInterface } from "./LabResultUI";
import { NurseInterface } from "./ScreeningUI";

export interface DrugAllergyInterface {
    ID: number,
	MedicalRecordID: number,
	MedicalRecord:  MedicalRecordInterface,
	DrugID:  number,
	Drug :  DrugInterface,
	DrugAllergy: string,
	NurseID : number
	Nurse:   NurseInterface,
	AddedTime : Date,
}

export interface DrugInterface {
    ID: number,
    Drug_Name      : string ,
	Drug_properties : string ,
	Drug_group      : string ,
	Stock           : number ,
}