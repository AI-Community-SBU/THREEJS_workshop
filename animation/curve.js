import * as THREE from 'three'

export class ParameterizedCurve{
    constructor(generator){
        this.generator = generator
        
    }

    sample(t){
        return this.generator(t)
    }
}