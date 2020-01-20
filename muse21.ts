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
    export function ReadInputSensor(ports: inputPorts): number {
        let temp = parseInt(ports.toString());
        return pins.analogReadPin(temp);
    }
	
	//% blockId="readsound" 
    //% block="Read Sound sensorV1 pin %ports"
    //% weight=43
    export function ReadSoundSensorV2(ports: inputPorts): number {
        let temp = parseInt(ports.toString());
        return pins.map(Math.abs(pins.analogReadPin(temp) - 512),0,512,0,1023);
    }

    //% blockId="readsound" 
    //% block="Read Sound sensorV2 pin %ports"
    //% weight=43
    export function ReadSoundSensor(ports: inputPorts): number {
        let temp = parseInt(ports.toString());
        return pins.analogReadPin(temp);
    }

    /**
     * Send a ping and get the echo time (in microseconds) as a result
     * @param trig tigger pin
     * @param echo echo pin
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
            case PingUnit.Centimeters: return Math.idiv(d, 58);
            case PingUnit.Inches: return Math.idiv(d, 148);
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
}

