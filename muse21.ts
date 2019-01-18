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
    //% block="Read Sound sensor pin %ports"
    //% weight=43
    export function ReadSoundSensor(ports: inputPorts): number {
        let temp = parseInt(ports.toString());
        return pins.map(Math.abs(pins.analogReadPin(temp) - 512),0,512,0,1023);
    }


    /**
     * Send a ping and get the echo time (in microseconds) as a result
     * @param trig tigger pin
     * @param echo echo pin
     * @param unit desired conversion unit
     * @param maxCmDistance maximum distance in centimeters (default is 500)
     */
    //%subcategory=More
    //% blockId=Ultrasonic_Sensor
    //%block="ping trig %trig|echo %echo|unit %unit"
	//% weight=13
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

}