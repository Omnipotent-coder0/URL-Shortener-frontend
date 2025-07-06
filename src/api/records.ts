import axios from "axios";

export interface ICreateRecordDto {
  originalURL: string;
}

export interface IUpdateRecordDto {
  originalURL: string;
}

export interface IRecord {
  _id: string;
  userId: string;
  originalURL: string;
  shortURL: string;
  counter: number
  createdAt: string;
  updatedAt: string;
}

export interface IGetAllRecordsData{
    data: IRecord[];
    message: string;
    statusCode: number;
}

export interface IGetRecordData{
    data: IRecord;
    message: string;
    statusCode: number;
}



// 1. GET all user records
export const getAllRecords = async () => {
  try {
    const response = await axios.get<IGetAllRecordsData>("/api/records");
    return response;
  } catch (error) {
    console.error("Fetching records failed", error);
    throw error;
  }
};

// 2. GET record by ID
export const getRecordById = async (id: string) => {
  try {
    const response = await axios.get<IGetRecordData>(`/api/records/${id}`);
    return response;
  } catch (error) {
    console.error(`Fetching record with ID ${id} failed`, error);
    throw error;
  }
};

// 3. CREATE record
export const createRecord = async (data: ICreateRecordDto) => {
  try {
    const response = await axios.post<IGetRecordData>("/api/records", data);
    return response;
  } catch (error) {
    console.error("Creating record failed", error);
    throw error;
  }
};

// 4. UPDATE record
export const updateRecord = async (id: string, data: IUpdateRecordDto) => {
  try {
    const response = await axios.patch<IGetRecordData>(`/api/records/${id}`, data);
    return response;
  } catch (error) {
    console.error(`Updating record with ID ${id} failed`, error);
    throw error;
  }
};

// 5. DELETE record
export const deleteRecord = async (id: string) => {
  try {
    const response = await axios.delete<IGetRecordData>(`/api/records/${id}`);
    return response;
  } catch (error) {
    console.error(`Deleting record with ID ${id} failed`, error);
    throw error;
  }
};
