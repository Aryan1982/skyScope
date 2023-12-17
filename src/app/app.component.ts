import { Component } from '@angular/core';
import axios from 'axios';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SkyScope';
  place:string=''
  savedPlaces:string[]=[];
  data:{
    temperature:number,
    location:string,
    overAll:string,
    UV:number,
    country:string,
    LocalTime:Date,
    LastUpdated:Date
  
}[]=[];


  async getdata(query:string){  
    const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
    params: {q: `${query}`},
    headers: {
      'X-RapidAPI-Key': '0a1e34d952msh02e830b8ce7b222p115ec2jsn9533e0a4a51c',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

    try{
      const response = await axios.request(options);
      // console.log(response.data);
      this.data=[
        {
          temperature: response.data.current.temp_c,
          location:response.data.location.name,
          overAll:response.data.current.condition.text,
          UV:response.data.current.uv,
          country:response.data.location.country,
          LocalTime:response.data.location.localtime,
          LastUpdated:response.data.current.last_updated,
        }];
      console.log(this.data);
    } catch (error) {
      console.error(error);
    }
  }

  ngOnInit(){
    // this.getdata()
  }
  onSearch(){
    this.getdata(this.place);
  }

  onSave(){
    this.savedPlaces.push(this.place)
    console.log(this.savedPlaces)
  }

  deleteSavedPlace(index:number){
    this.savedPlaces.splice(index,1);
    console.log(this.savedPlaces)
  }

  searchSelectedPlace(index:number){
    this.getdata(this.savedPlaces[index])
  }
}
