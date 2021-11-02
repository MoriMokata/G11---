export interface ScreeningInterface {

    ID: string, 
    Symptoms : string,
    Weight : number,
    Height: number,
    Temperature: number,
    PulseRate : number,
    RespirationRate: number,
    Savedate: Date | null,
 
    //fk
    MedRecID: number, 
    MedRec: MedRecOfficersInterface
    DiseaseID: number, 
    Disease: DiseaseInterface
    NurseID: number, 
    Nurse : NurseInterface,
    SeveTime :Date,
}

export interface NurseInterface {

    ID: string, 
    Name : string,
    Email : string,
    Pass: string,
}


export interface DiseaseInterface {

    ID: string, 
    Name : string,
    Description : string,

}




export interface HealthInsurancesInterface {

    ID: number,
   
    HealthInsurance_Name: string,

    Detail: string,

   }


   export interface MedRecOfficersInterface {

    ID: number,
   
    MedRecOfficer_Name: string,

    MedRecOfficer_Email: string,

    MedRecOfficer_Pass: string, 

   }

   export interface NametitlesInterface {

    ID: number,
   
    Title: string,

   }