import RNA from'./RNA.js';

const samples = 1000;

setInterval(() => {
    const rna = new RNA(10, [5, 5, 5, 5, 1]);
    
    let total = 0;

    for (let i=0; i<samples; i++) {
        const inputs = new Array(10).fill().map(() => Math.random());
        const [r] = rna.compute(inputs);
        total += r;
    }

    console.clear();
    console.log(total / samples);

}, 1000);