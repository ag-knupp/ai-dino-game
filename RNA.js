// function random number
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}
  
  // function linear interpolation - guess 2 known numbers
  
function lerp(a, b, t) {
    // calculate a intermediate value between 'a' and 'b' based on the 't' factor
    return a + (b - a) * t;
}
  
// class Neuron definition
class Neuron {
    constructor(inputs) {
      // bias - number that will help the AI learn, understand standards, ect
      this.bias = randomRange(-1, 1);
      
      // initiates a weight list with random values between 1 and -1
      this.weightList = new Array(inputs)
        .fill()
        .map(() => randomRange(-1, 1));
    };
  
    // function to calculate the neuron activation
    g(signalList = []) {
      let u = 0;
        // calculate the weighted sum
      for (let i = 0; i < this.weightList.length; i++) {
        u += signalList[i] * this.weightList[i];
      }
  
      // verify the neuron is activated
      if (Math.tanh(u) > this.bias) return 1; // activated
      else return 0; // not activated
    };
  
    // diversify the AI
    mutate(rate = 1) {
      this.weightList = this.weightList.map((w) => {
        return lerp(w, randomRange(-1, 1), rate);
      });
      
      this.bias = lerp(this.bias, randomRange(-1, 1), rate);
    }
}

// class RNA definition
class RNA {
    constructor(inputCount = 1, levelList = []) {
    // Initiates RNA score with zero
        this.score = 0;
  
      // Create neurons layers based on specifications
        this.levelList = levelList.map((l, i) => {
        // Calculates the current layer size
            const inputSize = i === 0 ? inputCount : levelList[i - 1];
  
        // Create a neurons layer with the calculated size
            return new Array(l).fill().map(() => new Neuron(inputSize));
        });
    }
  
    // Function calculates RNA output based on the input sings
    compute(list = []) {
      for (let i = 0; i < this.levelList.length; i++) {
        const tempList = [];
        // Calculates each neuron output in the current layer
        for (const neuron of this.levelList[i]) {
          if (list.length !== neuron.weightList.length) throw new Error('Invalid input');
          tempList.push(neuron.g(list));
        }
        list = tempList; // Update the input signs to the next layer
      }
      return list; // Return the final RNA output
    }

    // Function mutates all RNA neurons
    mutate(rate = 0.2) {
        for (const level of this.levelList) {
            for (const neuron of level) neuron.mutate(rate);
        }
    }   
  
    // Function loads existing RNA config
    load(rna) {
        if (!rna) return;
        try {
            this.levelList = rna.map((neuronList) => {
                return neuronList.map((neuron) => {
            // Create new neurons based on load RNA data
                const n = new Neuron();
                n.bias = neuron.bias;
                n.weightList = neuron.weightList;
                return n;
            });
        });
      } catch (e) {
        return;
      }
    }
    // Function save current RNA config
    save() {
      return this.levelList;
    }
}
  
  // Export RNA class as the module default value
  export default RNA;