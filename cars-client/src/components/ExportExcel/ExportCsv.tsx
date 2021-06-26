import React from 'react'
import Button from 'react-bootstrap/Button';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { IAd } from '../../interfaces/IEntity';
// @ts-ignore
export const ExportCSV = ({csvData, fileName}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToCSV = (csvData: IAd[], fileName: string) => {
        const arrayForExport: any[] = []
        csvData.forEach((ad) => {
            var object = {
                "Код объявления": ad.id,
                "Марка": ad.model.brand.name,
                "Модель": ad.model.name,
                "Привод": ad.model.driveUnits.type,
                "Год выпуска": ad.model.yearRelease,
                "Кол.владельцев": ad.countOwners,
                "Мощность": ad.model.hp,
                "Объем двигателя": ad.model.engineCapacity,
                "Тип двигателя": ad.model.engineType.name,
                "Коробка передач": ad.model.transmission.type,
                "Цена": ad.price,
            }
            arrayForExport.push(object)
        });

        console.log(arrayForExport);
        const ws = XLSX.utils.json_to_sheet(arrayForExport);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });


        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    return (
        <Button variant="success" onClick={(e) => exportToCSV(csvData,fileName)}>Excel</Button>
    )
}