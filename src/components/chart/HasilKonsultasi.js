import React, { Component } from 'react'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import RadarChart from 'recharts/lib/chart/RadarChart';
import Radar from 'recharts/lib/polar/Radar';
import PolarGrid from 'recharts/lib/polar/PolarGrid';
import PolarAngleAxis from 'recharts/lib/polar/PolarAngleAxis';
import PolarRadiusAxis from 'recharts/lib/polar/PolarRadiusAxis';
import ToolTip from 'recharts/lib/component/Tooltip';
const data = [
    { subject: 'Math', A: 66.666, fullMark: 100 },
    { subject: 'Chinese', A: 98, fullMark: 100 },
    { subject: 'English', A: 86, fullMark: 100 },
    { subject: 'Geography', A: 99, fullMark: 100 },
    { subject: 'Physics', A: 85, fullMark: 100 },
    { subject: 'History', A: 65, fullMark: 100 },
];

 class HasilKonsultasi extends Component {

  fetchData = () =>{
    if(this.props.dataHasil !== null || typeof this.props.dataHasil === 'undefined'){
      let dataKesimpulan=[];
      this.props.dataHasil.forEach((hasil)=>{
        dataKesimpulan.push({subject:hasil.namaJurusan,A:hasil.dataMatched/hasil.maxLength*100,fullMark:100})
      }) 
      return dataKesimpulan;
    }
    
  }  

  render() {
    
    
    return (
      <div>
        <RadarChart cx={300} cy={200} outerRadius={150} width={600} height={400} data={this.fetchData()}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
              
          <ToolTip/>
                <Radar name="Hasil" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
      </div>
    )
  }
}



export default HasilKonsultasi;