import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import { Holiday} from '../component/holiday/holiday';

@Injectable()
export class HolidayService {

    constructor(private httpClient: HttpCommonService) { }
    getAllHolidays() {
      return this.httpClient.get('HolidayMaster/GetHolidayMaster');
    }
    addHoliday(holiday: Holiday) {
      return this.httpClient.post('HolidayMaster/InsertHolidayMaster', holiday);
    }
    updateHoliday(holiday: any) {
      return this.httpClient.put('HolidayMaster/UpdateHolidayMaster', holiday);
    }
    deleteHoliday(id?: number) {
      return this.httpClient.delete('HolidayMaster/DeleteHolidayMaster/' + id);
    }
    deleteHolidays(holidays: Holiday[]) {
      return this.httpClient.post('HolidayMaster/DeleteHolidayMasters',holidays);
    }
}
