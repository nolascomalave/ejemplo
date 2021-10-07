function adaptNumTime(num){
	let result='';
	switch (String(num).length){
		case 1:
			result=String('0'+num);
			break;
		default :
			result=String(num);
			break;
	}
	return result;
}

function extractNumberDate(date){
	date=date.split('/');
	return Number(date[2]+date[1]+date[0]);
}

function getDateLikeJSON(date){
	date=date.split('/');
	return {
		day: Number(date[0]),
		month: Number(date[1]),
		year: Number(date[2])
	}
}

function validateBisiestYear(year){
	let result=null;
	year=Number(year);

	if(new Date(year, 1, 29).toLocaleDateString()=='29/2/'+year){
		result=true;
	}

	return result;
}

function getTimeDifferenceBettwenDates(date1, date2){
	let meses=[31,28,31,30,31,30,31,31,30,31,30,31], dateMin=null, dateMax=null,
	numberDate1=extractNumberDate(date1), numberDate2=extractNumberDate(date2),
	days=0,	months=0, years=0, sumDay=0, restDay=0;

	date1=getDateLikeJSON(date1);
	date2=getDateLikeJSON(date2);
	date1.month--;
	date2.month--;

	if(numberDate1<numberDate2){
		dateMin=date1;
		dateMax=date2;
	}else if(numberDate1>numberDate2){
		dateMin=date2;
		dateMax=date1;
	}

	if(numberDate1!=numberDate2){
		if(dateMin.year<dateMax.year){
			days=meses[dateMin.month]-dateMin.day;

			if((dateMin.month==1 && dateMin.day<29) && validateBisiestYear(dateMin.year)){
				days++;				
			}

			for(let i=(dateMin.month+1); i<meses.length; i++){
				days=days+meses[i];
			}

			sumDay=sumDay+days;

			if(dateMin.month>dateMax.month){
				months=12-(dateMin.month+1);
			}

			for(let i=(dateMin.year+1); i<=dateMax.year; i++){
				if(i<dateMax.year){
					days=days+365;
					years++;
					if(validateBisiestYear(i)){
						days++;						
					}
				}else{
					for(let j=0; j<=dateMax.month; j++){
						if(j<dateMax.month){
							sumDay=sumDay+meses[j];
							if(j>dateMin.month){
								months++;
							}
						}else{
							sumDay=sumDay+dateMax.day;
							if(dateMin.day<=dateMax.day){
								if(dateMin.month!=dateMax.month){
									months++;
								}
								restDay=dateMax.day-dateMin.day;
							}else if(dateMax.month==0){
								restDay=meses[11]-dateMax.day;
							}else{
								restDay=meses[(dateMax.month-1)]-(dateMin.day-dateMax.day);
								if(validateBisiestYear(dateMax.year) && (dateMax.month-1)==1){
									restDay++;
								}
							}
						}
					}

					if(validateBisiestYear(i) && ((dateMax.month>1) || dateMax.month>1)){
						sumDay++;						

						if(sumDay>365){
							years++;
						}
					}else if(sumDay>364){
						years++;
					}

					if(dateMin.month==dateMax.month && years==0){
						months=11;
					}
					
					if(dateMax.year-dateMin.year>1){
						days=days;
					}else{
						days=sumDay;
					}
				}
			}
		}else if(dateMax.month>dateMin.month){
			days=days+(meses[dateMin.month]-dateMin.day);

			for(let j=(dateMin.month+1); j<=dateMax.month; j++){
				if(j<dateMax.month){
					days=days+meses[j];
					if(j>dateMin.month){
						months++;
					}
				}else{
					sumDay=sumDay+dateMax.day;
					if(dateMin.day<=dateMax.day){
						months++;
						restDay=dateMax.day-dateMin.day;
					}else if(dateMax.month==0){
						restDay=meses[11]-dateMax.day;
					}else{
						restDay=meses[(dateMax.month-1)]-(dateMin.day-dateMax.day);
						if(validateBisiestYear(dateMax.year) && (dateMax.month-1)==1){
							restDay++;
						}
					}
				}
			}

			days=days+dateMax.day;
			if(validateBisiestYear(dateMax.year)){
				if((dateMax.month==1 && dateMax.day>28) || dateMax.month>1){
					days++;
				}
			}
		}else{
			days=dateMax.day-dateMin.day;
			restDay=days;
		}
	}

	return {
		years,
		months,
		days:restDay
	}
}

console.log(getTimeDifferenceBettwenDates('02/01/1016', '02/01/2021'));