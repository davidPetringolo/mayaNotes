/**
 * Created by Phil on 15/05/2016.
 */


mayaNotes.service('dataAccess',
    
        function ($rootScope) {
            var temp = [
                {
                    id: 1,
                    name: 'Mario',
                    surname:'Rossi',
                    sex: 'M',
                    email: 'mario@rossi.it',
                    tel: '+391234567',
                    birthday: '19821101 00:00:00.000',
                    cityOfBirth: 'Udine',
                    fiscalCode: 'ABC123DEF456',
                    address: 'via Pippo 1',
                    city: 'Pordenone'
                },
                {
                    id: 2,
                    name: 'Paola',
                    surname:'Bianchi',
                    sex: 'F',
                    email: 'paola@bianchi.it',
                    tel: '+39987654',
                    birthday: '19850825 00:00:00.000',
                    cityOfBirth: 'Treviso',
                    fiscalCode: 'ABC123DEF456',
                    address: 'via Pluto 12',
                    city: 'Conegliano'
                },{
                    id: 3,
                    name: 'Alberto',
                    surname:'Persano',
                    sex: 'F',
                    email: 'alberto@yahoo.com',
                    tel: '+6541645',
                    birthday: '19850825 00:00:00.000',
                    cityOfBirth: 'Milano',
                    fiscalCode: 'SEFDGHJJHFD',
                    address: 'via Rinascimento Proxio',
                    city: 'buja'
                }
            ];

            var l = localStorage.getItem('people');
            if(l)
                temp = JSON.parse(l);

            var result = new Object();

            result.getAll = function(){
                return temp;
            };

            result.getById = function(id){
                for(var i= 0; i < temp.length; i++){
                    var x = temp[i];
                    if(x.id == id)
                        return x;
                }

                return null;
            };

            result.update = function(obj){
                if(obj != null) {
                    for (var i = 0; i < temp.length; i++) {
                        var x = temp[i];
                        if (x.id == obj.id) {
                            temp[i] = obj;
                            localStorage.setItem('people', angular.toJson(temp));
                            return;
                        }
                    }
                }
            };

            result.insert = function(obj){
                if(obj != null) {
                    if(temp.length == 0)
                        obj.id = 1;
                    else
                        obj.id =  temp[temp.length - 1].id + 1;
                    temp.push(obj);
                    localStorage.setItem('people', angular.toJson(temp));
                }
            };

            result.delete = function(id){
                for(var i= 0; i < temp.length; i++){
                    var x = temp[i];
                    if(x.id == id){
                        temp.splice(i, 1);
                        localStorage.setItem('people', angular.toJson(temp));
                        return;
                    }
                }
            };

            return result;
        });
