export interface MemberDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  idNo?: string;
  idProof?: string;
  gender: string;
  dose: string;
  yob: number;
  previousVaccineType?: string;
  registeredInCowin: boolean;
  beneficiaryReferenceId?: string;
}

export interface UpdateMemberDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  idNo?: string;
  idProof?: string;
  gender: string;
  dose: string;
  yob: number;
  earlierVaccType?: string;
  registeredInCowin: boolean;
  beneficiaryRefId?: string;
  id: string;
  memberId: string;
}

export interface ProfileDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  location: string;
  idNo?: string;
  idProof?: string;
  gender: string;
  dose: string;
  yob: number;
  previousVaccineType?: string;
  registeredInCowin: boolean;
  beneficiaryReferenceId?: string;
  // id?: string;
}

export interface SaveUserDetails {
  members: [
    {
      firstName: string;
      lastName: string;
      email: string;
      phoneNo: string;
      idNo?: string;
      idProof?: string;
      gender: string;
      dose: string;
      yob: number;
      previousVaccineType?: string;
      registeredInCowin: boolean;
      beneficiaryReferenceId?: string;
      id: string;
      memberId: string;
    }
  ];
  primaryUser: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    location: string;
    idNo?: string;
    idProof?: string;
    gender: string;
    dose: string;
    yob: number;
    previousVaccineType?: string;
    registeredInCowin: boolean;
    beneficiaryReferenceId?: string;
  };
}

export interface PrimaryUser{
  firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    location: string;
    idNo?: string;
    idProof?: string;
    gender: string;
    dose: string;
    yob: number;
    previousVaccineType?: string;
    registeredInCowin: boolean;
    beneficiaryReferenceId?: string;
}

export interface UpdateMember{
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  idNo?: string;
  idProof?: string;
  gender: string;
  dose: string;
  yob: number;
  previousVaccineType?: string;
  registeredInCowin: boolean;
  beneficiaryReferenceId?: string;
  id: string;
  memberId: string
}