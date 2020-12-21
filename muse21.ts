let table = [
    841.6633,791.9993,745.582,702.1797,661.5781,
    623.5794,588.0013,554.6749,523.4445,494.1656,
    466.7047,440.9383,416.7518,394.0392,372.7019,
    352.6489,333.7953,316.0625,299.3774,283.6722,
    268.8838,254.9534,241.8264,229.452,217.7828,
    206.7746,196.3865,186.5799,177.3192,168.571,
    160.3041,152.4894,145.0997,138.1096,131.4954,
    125.2348,119.307,113.6926,108.3733,103.3321,
    98.5529,94.0209,89.7218,85.6425,81.7707,
    78.0947,74.6035,71.2871,68.1356,65.1402,
    62.2922,59.5837,57.0071,54.5553,52.2217,
    50,47.8843,45.8689,43.9487,42.1186,40.3741,
    38.7106,37.1241,35.6106,34.1663,32.7878,
    31.4718,30.2152,29.0149,27.8682,26.7725,
    25.7252,24.7239,23.7665,22.8508,21.9748,
    21.1366,20.3343,19.5664,18.8311,18.1269,
    17.4524,16.8062,16.1869,15.5933,15.0243,
    14.4787,13.9554,13.4534,12.9718,12.5097,
    12.0661,11.6403,11.2315,10.8388,10.4617,
    10.0994,9.7512,9.4167,9.095,8.7858,
    8.4885,8.2026,7.9275,7.6629,7.4083,
    7.1632,6.9273,6.7002,6.4816,6.271,
    6.0682,5.8727,5.6845,5.503,5.3281,
    5.1596,4.997,4.8403,4.6891,4.5433,
    4.4027,4.267,4.136,4.0096,3.8875,
    3.7697,3.656,3.5461,3.44,3.3375
]

//% weight=100 color="#F59E20" icon="\uf0c3"
namespace Muse21 {
  
    export enum inputPorts {
        //% block="P0"
        P0 = 7,
        //% block="P1"
        P1 = 8,
        //% block="P2"
        P2 = 9
    }

    export enum digitalonoff {
        //% block="off"
        off,
        //% block="on"
        on
    }

    export enum muselaboutput {
        //% block="actuator"
        actuator,
        //% block="motor"
        motor,
        //% block="mono-tone buzzer"
        buzzer,
        //% block="LED"
        LED
    }

    export enum ServoDirection {
        //% block="clockwise"
        clockwise,
        //% block="anti-clockwise"
        anticlockwise
    }

    export enum Servo {
        //% blockId=muselab_servo_zero
        //% block="P0"
        Servo0 = 0,
        //% blockId=muselab_servo_one
        //% block="P1"
        Servo1 = 1,
        //% blockId=muselab_servo_two
        //% block="P2"
        Servo2 = 2,
        //% blockId=muselab_servo_twelve
        //% block="P12"
        Servo12 = 3,
        //% blockId=muselab_servo_five
        //% block="D5"
        Servo5 = 5,
        //% blockId=muselab_servo_six
        //% block="D6"
        Servo6 = 6,
        //% blockId=muselab_servo_seven
        //% block="D7"
        Servo7 = 7,
        //% blockId=muselab_servo_eight
        //% block="D8"
        Servo8 = 8

    }

    export enum TMP36Type {
        //% block="(℃)" enumval=0
        TMP36_temperature_C,
    
        //% block="(℉)" enumval=1
        TMP36_temperature_F
    }

    export enum NTCType {
        //% block="(℃)" enumval=0
        NTC_temperature_C,
    
        //% block="(℉)" enumval=1
        NTC_temperature_F
    }
    
    export enum PingUnit {
        //% block="μs"
        MicroSeconds,
        //% block="cm"
        Centimeters,
        //% block="inches"
        Inches
    }

    //% blockId="turnoutput"
    //% block="Set Muselab %muselabtype| pin %pin| to %onoff"
    //% weight=65
    //% blockGap=7
    export function TurnOutput(muselabtype: muselaboutput, pin: Servo, onoff: digitalonoff): void {

        if (parseInt(pin.toString()) < 4) {
            switch (pin) {
                case Servo.Servo0:
                    pins.digitalWritePin(DigitalPin.P0, onoff);
                    break
                case Servo.Servo1:
                    pins.digitalWritePin(DigitalPin.P1, onoff);
                    break
                case Servo.Servo2:
                    pins.digitalWritePin(DigitalPin.P2, onoff);
                    break
                case Servo.Servo12:
                    pins.digitalWritePin(DigitalPin.P12, onoff);
                    break
            }

        } else
            serial.writeLine("(AT+digital?pin=" + pin + "&intensity=" + onoff + ")");

    }

    //% blockId="turnoutput_pwm"
    //% block="Set Muselab %muselabtype| pin %pin| to intensity %intensity"
    //% intensity.min=0 intensity.max=1023
    //% weight=60	
    export function TurnOutputPwm(muselabtype: muselaboutput, pin: Servo, intensity: number): void {
        if (parseInt(pin.toString()) < 4) {
            switch (pin) {
                case Servo.Servo0:
                    pins.analogWritePin(AnalogPin.P0, intensity);
                    break
                case Servo.Servo1:
                    pins.analogWritePin(AnalogPin.P1, intensity);
                    break
                case Servo.Servo2:
                    pins.analogWritePin(AnalogPin.P2, intensity);
                    break
                case Servo.Servo12:
                    pins.analogWritePin(AnalogPin.P12, intensity);
                    break
            }

        } else
            serial.writeLine("(AT+pwm?pin=" + pin + "&intensity=" + intensity + ")");

    }

    //%blockId=muselab_180servo
    //% block="Control 180° servo pin %pin| degree %degree"
    //% degree.min=0 degree.max=180
    //% weight=50
    //% blockGap=7	
    export function control180Servo(pin: Servo, degree: number): void {
        if (parseInt(pin.toString()) < 4) {
            switch (pin) {
                case Servo.Servo0:
                    pins.servoWritePin(AnalogPin.P0, degree)
                    break
                case Servo.Servo1:
                    pins.servoWritePin(AnalogPin.P1, degree)
                    break
                case Servo.Servo2:
                    pins.servoWritePin(AnalogPin.P2, degree)
                    break
                case Servo.Servo12:
                    pins.servoWritePin(AnalogPin.P12, degree)
                    break
            }

        } else
            serial.writeLine("(AT+servo_180?pin=" + pin + "&degree=" + degree + ")");
    }

    //%blockId=muselab_360servo
    //% block="Control 360° servo pin %pin| direction %direction| speed %speed"
    //% speed.min=0 speed.max=100
    //% weight=45	
    export function control360Servo(pin: Servo, direction: ServoDirection, speed: number): void {
        if (parseInt(pin.toString()) < 4) {

            switch (direction) {
                case ServoDirection.clockwise:
                    speed = 90 + speed / 100 * 90;
                    break
                case ServoDirection.anticlockwise:
                    speed = 90 - speed / 100 * 90;
                    break
            }

            switch (pin) {
                case Servo.Servo0:
                    pins.servoWritePin(AnalogPin.P0, speed)
                    break
                case Servo.Servo1:
                    pins.servoWritePin(AnalogPin.P1, speed)
                    break
                case Servo.Servo2:
                    pins.servoWritePin(AnalogPin.P2, speed)
                    break
                case Servo.Servo12:
                    pins.servoWritePin(AnalogPin.P12, speed)
                    break
            }

        } else {

            switch (direction) {
                case ServoDirection.clockwise:
                    if (speed <= 10) {
                        serial.writeLine("(AT+digital?pin=" + pin + "&intensity=0)");
                    } else {
                        serial.writeLine("(AT+servo_360?pin=" + pin + "&direction=clockwise&speed=" + speed + ")");
                    }
                    break

                case ServoDirection.anticlockwise:
                    if (speed <= 10) {
                        serial.writeLine("(AT+digital?pin=" + pin + "&intensity=0)");
                    } else {
                        serial.writeLine("(AT+servo_360?pin=" + pin + "&direction=anticlockwise&speed=" + speed + ")");
                    }
                    break
            }
        }

    }

    //% blockId="readinput" 
    //% block="Read Muselab sensor pin %ports"
    //% weight=44
    export function ReadInputSensor(ports: AnalogPin): number {
        let temp = parseInt(ports.toString());
        return pins.analogReadPin(temp);
    }
	
	//% blockId="readsoundV1" 
    //% block="Read Sound sensor V1 pin %ports"
    //% weight=43
    export function ReadSoundSensorV1(ports: AnalogPin): number {
        let temp = parseInt(ports.toString());
        return pins.map(Math.abs(pins.analogReadPin(temp) - 512),0,512,0,1023);
    }

    //% blockId="readsoundV2" 
    //% block="Read Sound sensor V2 pin %ports"
    //% weight=43+
    export function ReadSoundSensorV2(ports: AnalogPin): number {
        let temp = parseInt(ports.toString());
        return pins.analogReadPin(temp);
    }

    /**
     * Send a ping and get the echo time (in microseconds) as a result
     * @param trig describe parameter here, eg: DigitalPin.P13
     * @param echo describe parameter here, eg: DigitalPin.P12
     * @param unit desired conversion unit
     * @param maxCmDistance maximum distance in centimeters (default is 500)
     */
    //% blockId=Ultrasonic_Sensor
    //%block="ping trig %trig|echo %echo|unit %unit"
	//% weight=42
    export function ping(trig: DigitalPin, echo: DigitalPin, unit: PingUnit, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);

        // read pulse
        const d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);

        switch (unit) {
            case PingUnit.Centimeters: return Math.idiv(d, 58)+2;
            case PingUnit.Inches: return Math.idiv(d, 148)+1;
            default: return d ;
        }
    }
    
    /**
     * TODO: get TMP36 Temperature(℃ or ℉)
     * @param temppin describe parameter here, eg: AnalogPin.P1
     */
    //% blockId="readtemp" block="Thermometer（Air） %tmp36type|at pin %temppin"
    export function Thermometer_Air(tmp36type: TMP36Type, temppin: AnalogPin): number {
        let voltage = 0;
        let Temperature = 0;
        let Reference_VOLTAGE = 3100;
        voltage = pins.map(
            pins.analogReadPin(temppin),
            0,
            1023,
            0,
            Reference_VOLTAGE
        );
        Temperature = (voltage - 500) / 10;
        
        switch (tmp36type) {
            case 0:
                return Math.round(Temperature)
                break;
            case 1:
                return Math.round(Temperature * 9 / 5 + 32)
                break;
            default:
                return 0
        }
    }
    
    /**
     * NTC mudule
    **/
    /**
     * TODO: get NTC Temperature(℃ or ℉)
     * @param temppin describe parameter here, eg: AnalogPin.P1
    **/
    //% blockId="readntctemp" block="Thermometer（Liquid） %ntctype|at pin %temppin"
    export function Thermometer_Liquid(ntctype: NTCType, temppin: AnalogPin): number {
        let voltage = 0;
        let Temperature = 0;
        
        voltage = pins.analogReadPin(temppin)
        for (let i = 0; i < table.length; i++) {
            Temperature=((table[i]/(table[i]+50))*3.3)/3.3*1023
            if (Temperature < voltage){
                switch (ntctype) {
                    case 0:
                        return i-30
                        break;
                    case 1:
                        return (i-30)* 9 / 5 + 32
                        break;
                    default:
                        return 0
                }
            }
        }
        switch (ntctype) {
            case 0:
                return 100-30
                break;
            case 1:
                return (100-30)* 9 / 5 + 32
                break;
            default:
                return 0
        }
    }


    /**
     * EC mudule
     **/
    /**
     * TODO：get EC value
     * @param temppin describe parameter here, eg: AnalogPin.P0
     **/
      //% blockId="readectemp" block="Electrical conductivity at pin %temppin"
      export function Electrical_conductivity(temppin: AnalogPin): number {
        let voltage = 0;
        let Electrical = 0;
        
        voltage = pins.analogReadPin(temppin);
        voltage = voltage*3.3/1024;
        Electrical= voltage*0.5*1.8*2;
        return Electrical
      }
    /**
     * PH mudule
     **/
    /**
     * TODO：get PH value
     * @param temppin describe parameter here, eg: AnalogPin.P0
     **/
    //% blockId="readphtemp" block="get PH value at pin %temppin"
      export function Get_Ph(temppin: AnalogPin): number {
        let voltage = 0;
        let phvlaue = 0;
        
        voltage = pins.analogReadPin(temppin);
        voltage = voltage*3.3/1024;
        phvlaue= 3.52*voltage-1.7688;
        return phvlaue
      }

    /**
     * Rotation per second
     **/
    /**
     * TODO：Rotation per second
     **/
    //% blockId="Pulse-RPS" block="get Pulse-Rotation per Second with |Checker: %Checker Threshold: %Threshold from Pin %temppin"
	//% Checker.defl=8 Threshold.defl=30 temppin.defl=AnalogPin.P0
    //% inlineInputMode=external
    export function Pulse_RPS( Checker: number,Threshold: number,temppin: AnalogPin): number {
		let time_startingTime = input.runningTime();
        let temp_pin = parseInt(temppin.toString());
		let cache = 0;
        let temp_pin_value = pins.analogReadPin(temp_pin);
        let howmanytimes = 0;
        
        if (temp_pin_value > Threshold) {
            cache = 1;
        } else if (temp_pin_value <= Threshold) {
            cache = 0;
        }
        while(1){
            temp_pin_value = pins.analogReadPin(temp_pin);
            if(cache == 1 && temp_pin_value <= Threshold){
                cache = 0;
                howmanytimes +=1;
            } else if (cache == 0 && temp_pin_value > Threshold){
                cache = 1;
                howmanytimes +=1;
            }
            if(input.runningTime()-time_startingTime >= 1000){
                break;
            }
        }
		return howmanytimes/Checker/((input.runningTime()-time_startingTime)/1000);
    }
	
	/**
     * Wind Direction Number
     **/
    /**
     * To get the wind direction(Number) from three pin.
     **/
    //% blockId="block_getWindDirection_N" block="Get the wind direction(Number) from |8-Checker Pin %temppin0 2-Checker Pin %temppin1 4-Checker Pin %temppin2 Threshold: %Threshold" 
    //% Threshold.defl=30 temppin1.defl=AnalogPin.P1 temppin2.defl=AnalogPin.P2
    export function function_getWindDirection_N(temppin0: AnalogPin, temppin1: AnalogPin, temppin2: AnalogPin, Threshold: number): number {
		let temp_pin0_value = pins.analogReadPin(parseInt(temppin0.toString()));
		let temp_pin1_value = pins.analogReadPin(parseInt(temppin1.toString()));
		let temp_pin2_value = pins.analogReadPin(parseInt(temppin2.toString()));
		let direction = 0;
		if (temp_pin0_value < Threshold) {
			if (temp_pin1_value < Threshold) {
				if (temp_pin2_value < Threshold) {
					direction = 0;
				} else {
					direction = 2;
				}
			} else {
				if (temp_pin2_value < Threshold) {
					direction = 4;
				} else {
					direction = 6;
				}
			}
		} else {
			if (temp_pin1_value < Threshold) {
				if (temp_pin2_value < Threshold) {
					direction = 3;
				} else {
					direction = 1;
				}
			} else {
				if (temp_pin2_value < Threshold) {
					direction = 5;
				} else {
					direction = 7;
				}
			}
		}
		return direction;
    }

    /**
     * Wind Directtion Word
     **/
    /**
     * To get the wind direction(Word) from three pin.
     **/
    //% blockId="block_getWindDirection_W" block="Get the wind direction(Word) from |8-Checker Pin %temppin0 2-Checker Pin %temppin1 4-Checker Pin %temppin2 Threshold: %Threshold" 
    //% Threshold.defl=30 temppin1.defl=AnalogPin.P1 temppin2.defl=AnalogPin.P2
    export function function_getWindDirection_W(temppin0: AnalogPin, temppin1: AnalogPin, temppin2: AnalogPin, Threshold: number): string {
		let temp_pin0_value = pins.analogReadPin(parseInt(temppin0.toString()));
		let temp_pin1_value = pins.analogReadPin(parseInt(temppin1.toString()));
		let temp_pin2_value = pins.analogReadPin(parseInt(temppin2.toString()));
		let direction = "";
		if (temp_pin0_value < Threshold) {
			if (temp_pin1_value < Threshold) {
				if (temp_pin2_value < Threshold) {
					direction = "N";
				} else {
					direction = "E";
				}
			} else {
				if (temp_pin2_value < Threshold) {
					direction = "S";
				} else {
					direction = "W";
				}
			}
		} else {
			if (temp_pin1_value < Threshold) {
				if (temp_pin2_value < Threshold) {
					direction = "SE";
				} else {
					direction = "NE";
				}
			} else {
				if (temp_pin2_value < Threshold) {
					direction = "SW";
				} else {
					direction = "NW";
				}
			}
		}
		return direction;
    }
    
      
}
//% weight=100 color="#F59E20" icon="\uf0c3"
namespace Digital_Sensor{

    function Convert_string(reg:number):string {
        let a1= ""
        switch(reg){ 
             case 0 : a1="0";break;
             case 1 : a1="1";break;
             case 2 : a1="2";break;
             case 3 : a1="3";break;
             case 4 : a1="4";break;
             case 5 : a1="5";break;
             case 6 : a1="6";break;
             case 7 : a1="7";break;
             case 8 : a1="8";break;
             case 9 : a1="9";break;
             case 10 :a1="A";break;
             case 11 :a1="B";break;
             case 12 :a1="C";break;
             case 13 :a1="D";break;
             case 14 :a1="E";break;
             case 15 :a1="F";break;
             default:    break;
        }
        return a1
    }
    function Convert_number(reg:string):number {
        let a1
        switch(reg){ 
             case "0" : a1=0;break;
             case "1" : a1=1;break;
             case "2" : a1=2;break;
             case "3" : a1=3;break;
             case "4" : a1=4;break;
             case "5" : a1=5;break;
             case "6" : a1=6;break;
             case "7" : a1=7;break;
             case "8" : a1=8;break;
             case "9" : a1=9;break;
             case "A" :a1=10;break;
             case "B" :a1=11;break;
             case "C" :a1=12;break;
             case "D" :a1=13;break;
             case "E" :a1=14;break;
             case "F" :a1=15;break;
             default:    break;
        }
        return a1
    }
    function change(DATA:string):string{ 
         let tb = pins.createBuffer(8)//Define IIC send data buffer
         let ta = pins.createBuffer(9)
         let b1 = DATA
         let tc=[]
         tb[0] =Convert_number(b1.substr(0,1))*16 + Convert_number(b1.substr(1,1))
         tb[1] =Convert_number(b1.substr(2,1))*16 + Convert_number(b1.substr(3,1))
         tb[2] =Convert_number(b1.substr(4,1))*16 + Convert_number(b1.substr(5,1))
         tb[3] =Convert_number(b1.substr(6,1))*16 + Convert_number(b1.substr(7,1))
         tb[4] =Convert_number(b1.substr(8,1))*16 + Convert_number(b1.substr(9,1))
         tb[5] =Convert_number(b1.substr(10,1))*16 + Convert_number(b1.substr(11,1))
         tb[6] =Convert_number(b1.substr(12,1))*16 + Convert_number(b1.substr(13,1))
         tb[7] =Convert_number(b1.substr(14,1))*16 + Convert_number(b1.substr(15,1))
        
         pins.i2cWriteBuffer(0X01, tb);
         ta = pins.i2cReadBuffer(0X01, 9);
         tc[0] = ta[0]
         tc[1] = ta[1]
         tc[2] = ta[2]
         tc[3] = ta[3]
         tc[4] = ta[4]
         tc[5] = ta[5]
         tc[6] = ta[6]
         tc[7] = ta[7]
         tc[8] = ta[8]
         tc[9] = ta[9]
         
         let a1= ""
         let a2= ""
         let a3= ""
         let a4 = ""
         let a5= ""
         let a6= ""
         let a7= ""
         let a8= ""
         let a9 = ""
         
         a1 = Convert_string(Math.floor(tc[0]/16))+Convert_string(tc[0]%16)
         a2 = Convert_string(Math.floor(tc[1]/16))+Convert_string(tc[1]%16)
         a3 = Convert_string(Math.floor(tc[2]/16))+Convert_string(tc[2]%16)
         a4 = Convert_string(Math.floor(tc[3]/16))+Convert_string(tc[3]%16)
         a5 = Convert_string(Math.floor(tc[4]/16))+Convert_string(tc[4]%16)
         a6 = Convert_string(Math.floor(tc[5]/16))+Convert_string(tc[5]%16)
         a7 = Convert_string(Math.floor(tc[6]/16))+Convert_string(tc[6]%16)
         a8 = Convert_string(Math.floor(tc[7]/16))+Convert_string(tc[7]%16)
         a9 = Convert_string(Math.floor(tc[8]/16))+Convert_string(tc[8]%16)
         
         let re = a1.concat(a2.concat(a3.concat(a4.concat(a5.concat(a6.concat(a7.concat(a8.concat(a9))))))))
         return re
       
    }
    function ouput(): number {
        let tb = pins.createBuffer(8)//Define IIC send data buffer
        let ta = pins.createBuffer(9)//Define IIC accept data buffer 0x01,0x03,0x00,0x01,0x00,0x02,0x95,0xCB
        let tc=[]                  
 
        tb[0] = 0x01
        tb[1] = 0x03
        tb[2] = 0x00
        tb[3] = 0x01
        tb[4] = 0x00
        tb[5] = 0x02
        tb[6] = 0x95
        tb[7] = 0xCB        
        pins.i2cWriteBuffer(0X01, tb);
        ta = pins.i2cReadBuffer(0X01, 9);
        tc[0] = ta[5]
        tc[1] = ta[6]
        tc[2] = ta[3]
        tc[3] = ta[4]
        let a1= ""
        let a2= ""
        let a3= ""
        let a4= ""
       //Converts a decimal number to a hexadecimal string 
        a1=Convert_string(Math.floor(tc[0]/16))+Convert_string(tc[0]%16)
        a2=Convert_string(Math.floor(tc[1]/16))+Convert_string(tc[1]%16)
        a3=Convert_string(Math.floor(tc[2]/16))+Convert_string(tc[2]%16)
        a4=Convert_string(Math.floor(tc[3]/16))+Convert_string(tc[3]%16)
        //String splicing
        a1=a1.concat(a2.concat(a3).concat(a4))
        //Calculation formula of converting string to floating point type
        let b = parseInt(a1,16);
        let s = b&0x80000000/0x80000000;
        let e = (b&0x7f800000)/0x800000-127;
        let c = (b&0x7fffff)/0x800000;
        let re =Math.abs(Math.pow(-1,s)*(1+c)*Math.pow(2,e))-0.01;
        return re
        
    }

    function ouput1(s1: number ,s2:number,s3:number,s4:number,s5:number,s6:number,s7:number,s8:number): string {
                let tb = pins.createBuffer(8)//Define IIC send data buffer
                let ta = pins.createBuffer(9)//Define IIC accept data buffer
                let tc=[]                  
                tb[0] = s1
                tb[1] = s2
                tb[2] = s3
                tb[3] = s4
                tb[4] = s5
                tb[5] = s6
                tb[6] = s7
                tb[7] = s8         
                
                pins.i2cWriteBuffer(0X01, tb);
                ta = pins.i2cReadBuffer(0X01, 9);
                tc[0] = ta[0]
                tc[1] = ta[1]
                tc[2] = ta[2]
                tc[3] = ta[3]
                tc[4] = ta[4]
                tc[5] = ta[5]
                tc[6] = ta[6]
                tc[7] = ta[7]
                tc[8] = ta[8]
                tc[9] = ta[9]
        
                let a1= ""
                let a2= ""
                let a3= ""
                let a4 = ""
                let a5= ""
                let a6= ""
                let a7= ""
                let a8= ""
                let a9 = ""
        
                a1 = Convert_string(Math.floor(tc[0]/16))+Convert_string(tc[0]%16)
                a2 = Convert_string(Math.floor(tc[1]/16))+Convert_string(tc[1]%16)
                a3 = Convert_string(Math.floor(tc[2]/16))+Convert_string(tc[2]%16)
                a4 = Convert_string(Math.floor(tc[3]/16))+Convert_string(tc[3]%16)
                a5 = Convert_string(Math.floor(tc[4]/16))+Convert_string(tc[4]%16)
                a6 = Convert_string(Math.floor(tc[5]/16))+Convert_string(tc[5]%16)
                a7 = Convert_string(Math.floor(tc[6]/16))+Convert_string(tc[6]%16)
                a8 = Convert_string(Math.floor(tc[7]/16))+Convert_string(tc[7]%16)
                a9 = Convert_string(Math.floor(tc[8]/16))+Convert_string(tc[8]%16)
        
                let re = a1.concat(a2.concat(a3.concat(a4.concat(a5.concat(a6.concat(a7.concat(a8.concat(a9))))))))
                return re
            }
         /**
        * get Get_PH_VALUE from sensor
        */
       //%blockId=Get_PH_VALUE
       //% block=Get_PH_VALUE
       
       //% u.defl=Get_PH_VALUE
       //% weight=120	
       //% blockGap=8
       export function Get_PH_VALUE():number{
           
            return ouput()
       }
        /**
        * get RS485 DATA from sensor
        */
       //%blockId=Get_RS485_DATAV1
       //% block="Get_RS485_DATA Device_address %s1|Function_code %s2|Start_Address_High_Byte %s3|Start_Address_Low_Byte %s4|Register_number_High_Byte %s5|Register_number_Low_Byte %s6|CRC_High_Byte %s7|CRC_Low_Byte %s8"
       
       //% u.defl=Get_RS485_DATAV1
       //% weight=120	
       //% blockGap=8
       export function Get_RS485_DATAV1(Device_address: number ,Function_code:number,Start_Address_High_Byte:number,Start_Address_Low_Byte:number,Register_number_High_Byte:number,Register_number_Low_Byte:number,CRC_High_Byte:number,CRC_Low_Byte:number): string {
           
                 return ouput1(Device_address,Function_code,Start_Address_High_Byte,Start_Address_Low_Byte,Register_number_High_Byte,Register_number_Low_Byte,CRC_High_Byte,CRC_Low_Byte)
            }
   
        /**
        * get RS485 DATA from sensor
        */
       //%blockId=Get_RS485_DATAV2
       //% block="Get_RS485_DATAV2 %DATA"
       
       //% u.defl=Get_RS485_DATAV2
       //% weight=120	
       //% blockGap=8
       export function Get_RS485_DATAV2(DATA:string): string { 
       return change(DATA)
    }

}
