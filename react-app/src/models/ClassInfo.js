export class ClassInfo {
  constructor() {
    this.classCodes = ['MAC 1105', 'MAC 1114', 'MAC 2312', 'STA 4442', 'MAC 1140', 'MAC 2311', 'MAD 2104', 'MAD 3105',
      'COP 3363', 'CIS 3250', 'COP 3330', 'CDA 3100', 'COT 4420', 'COP 4530', 'CEN 4020', 'CEN 4020L', 'COP 4521', 'COP 4610',
      'Foreign Language I', 'Foreign Language II', 'Foreign Language III',
      'CHM 1045C', 'BSC 2010', 'BSC 2011', 'PHY 2048C', 'PHY 2049C', 'XXX xxxx',
      'CXX 3xxx or 4xxx I', 'CXX 4xxx I', 'CIS 4900 or CXX 3xxx', 'CS 4xxx or Advanced Math Elective',
      'CXX 3xxx or 4xxx II', 'CXX 4xxx II', 'CXX 4xxx III', 'CXX 4xxx IV']

    this.classNames = ["College Algebra", "Trigonometry", "Calculus II", "Intro to Probability", "Precalculus", "Calculus I", "Discrete Math I", "Discrete Math II",
      "Programming I in Unix", "Ethics and CS", "Object-Oriented Programming", "Computer Organization I", "Theory of Computation", "Data Strucs, Alg's & Gen Program",
      "Software Engineering", "Software Engineering Capstone", "Secure, Parallel & Dist. Python", "Op Sys & Conc Progr",
      'Foreign Language I', 'Foreign Language II', 'Foreign Language III',
      "Gen Chem I w/lab", "Bio Sci I", "Bio Sci II", "Gen Physics I w/lab", "Gen Physics II w/lab", "Science for Majors",
      'CXX 3xxx or 4xxx I', 'CXX 4xxx I', 'CIS 4900 or CXX 3xxx', 'CS 4xxx or Advanced Math Elective',
      'CXX 3xxx or 4xxx II', 'CXX 4xxx II', 'CXX 4xxx III', 'CXX 4xxx IV']
  }

  getClassName(code) {
    let pos = this.classCodes.indexOf(code);
    if (pos)
      return this.classNames[pos];
    else
      return null;
  }
}