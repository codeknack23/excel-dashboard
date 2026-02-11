import * as XLSX from "xlsx";

export const parseExcel = async () => {
  const response = await fetch("/sample-data.xlsx");
  const arrayBuffer = await response.arrayBuffer();

  const workbook = XLSX.read(arrayBuffer, { type: "array" });

  const sheet = workbook.Sheets["Data"];

  if (!sheet) {
    throw new Error("Sheet 'Data' not found.");
  }

  const data = XLSX.utils.sheet_to_json(sheet, { raw: true });

  if (!data.length) {
    throw new Error("Excel sheet is empty.");
  }

  return data;
};
