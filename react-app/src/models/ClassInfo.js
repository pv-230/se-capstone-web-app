export class ClassInfo {
    constructor() {
        this.classCodes = ["MAC 1105", "MAC 1114", "MAC 1140", "MAC 2311", "MAC 2312", "MAD 2104", "MAD 3105", "STA 4442", 
                    "CHM 1045C", "BSC 2010", "BSC 2011", "PHY 2048C", "PHY 2049C", "XXX xxxx", "Foreign Language I", "Foreign Language II",
                    "Foreign Language III", "COP 3363", "CIS 3250", "COP 3330", "CDA 3100", "COT 4420", "COP 4530", "CEN 4020",
                    "CEN 4090L", "COP 4521", "COP 4610", "CXX 3xxx or 4xxx", "CXX 4xxx", "CIS 4900 or CXX 3xxx", "CS 4xxx or Advanced Math"]

        this.classNames = ["College Algebra", "Trigonometry", "Precalculus", "Calculus I", "Calculus II", 
                    "Discrete Math I", "Discrete Math II", "Intro to Probability", "Gen Chem I w/lab", 
                    "Bio Sci I", "Bio Sci II", "Gen Physics I w/lab", "Gen Physics II w/lab", "Science for Majors", 
                    "Foreign Lang I", "Foreign Lang II", "Foreign Lang III", "Programming I in Unix", "Ethics and CS", 
                    "Object-Oriented Programming", "Computer Organization I", "Theory of Computation", 
                    "Data Strucs, Alg's & Gen Program", "Software Engineering", "Software Engineering Capstone", 
                    "Secure, Parallel & Dist. Python", "Op Sys & Conc Progr", "3000 or 4000 level CS Elective", 
                    "4000 level Upper Division Elective", "Directed Individual Study or 3000 level CS Elective", 
                    "4000 level CS or Advanced Math Elective"]
    }
    
    getClassName(code) {
        let pos = this.classCodes.indexOf(code);
        if(pos)
            return this.classNames[pos];
        else
            return null;
    }
}