
export enum CardKind {
    EMPLOYEE,
    KNOWLEDGE,
    ACTION
}

export interface CardType {
    id: number;
    kind: CardKind,
    name: string;
    count: number;
    cost: number;
}

export enum EmployeeKind {
    DEV,
    HR,
    SCRUM
}

export interface EmployeeCardType extends CardType {
    kind: CardKind.EMPLOYEE;
    employeeKind: EmployeeKind;
    burnoutResistance?: number;
    efficiency?: number;
}

export interface KnowledgeCardType extends CardType {
    kind: CardKind.KNOWLEDGE;
    efficiency: number;
}

// Employee Card
export const employeeCardTypes: EmployeeCardType[] = [
    {
        id: 4,
        kind: CardKind.EMPLOYEE,
        employeeKind: EmployeeKind.DEV,
        name: 'Code Monkey "Mike"',
        count: 2,
        cost: 2,
        efficiency: 2
    },
    {
        id: 5,
        kind: CardKind.EMPLOYEE,
        employeeKind: EmployeeKind.DEV,
        name: 'Ambitious Apprentice',
        count: 2,
        cost: 1,
        efficiency: 0
    },
    {
        id: 6,
        kind: CardKind.EMPLOYEE,
        employeeKind: EmployeeKind.DEV,
        name: 'The Assertive CTO',
        count: 1,
        cost: 5,
        efficiency: 4
    },
    {
        id: 7,
        kind: CardKind.EMPLOYEE,
        employeeKind: EmployeeKind.DEV,
        name: 'Copy Paste Developer',
        count: 2,
        cost: 1,
        efficiency: 2
    },
    {
        id: 8,
        kind: CardKind.EMPLOYEE,
        employeeKind: EmployeeKind.DEV,
        name: 'Downer Dave',
        count: 2,
        cost: 3,
        burnoutResistance: 2,
        efficiency: 1
    },
    {
        id: 17,
        kind: CardKind.EMPLOYEE,
        employeeKind: EmployeeKind.DEV,
        name: 'Database Developer',
        count: 2,
        cost: 4,
        burnoutResistance: 1,
        efficiency: 2
    },
    {
        id: 18,
        kind: CardKind.EMPLOYEE,
        employeeKind: EmployeeKind.DEV,
        name: 'BI Developer',
        count: 2,
        cost: 3,
        burnoutResistance: 1,
        efficiency: 2
    },
    {
        id: 19,
        kind: CardKind.EMPLOYEE,
        employeeKind: EmployeeKind.DEV,
        name: 'Full Stack Ninja',
        count: 2,
        cost: 4,
        efficiency: 3
    },
    {
        id: 20,
        kind: CardKind.EMPLOYEE,
        employeeKind: EmployeeKind.DEV,
        name: 'QA Wizard Engineer',
        count: 2,
        cost: 3,
        efficiency: 2
    },
    {
        id: 21,
        kind: CardKind.EMPLOYEE,
        employeeKind: EmployeeKind.DEV,
        name: 'Senior Backend Developer',
        count: 2,
        cost: 4,
        efficiency: 2
    },
    {
        id: 30,
        kind: CardKind.EMPLOYEE,
        employeeKind: EmployeeKind.DEV,
        name: 'Junior Backend Developer',
        count: 2,
        cost: 2,
        efficiency: 1
    },
    {
        id: 31,
        kind: CardKind.EMPLOYEE,
        employeeKind: EmployeeKind.DEV,
        name: 'Research Engineer',
        count: 2,
        cost: 2,
        efficiency: 2
    },
    {
        id: 32,
        kind: CardKind.EMPLOYEE,
        employeeKind: EmployeeKind.DEV,
        name: 'Lead Developer',
        count: 2,
        cost: 5,
        efficiency: 5
    },
    {
        id: 33,
        kind: CardKind.EMPLOYEE,
        employeeKind: EmployeeKind.DEV,
        name: 'Intern',
        count: 2,
        cost: 1,
        efficiency: 1
    },
    {
        id: 41,
        kind: CardKind.EMPLOYEE,
        employeeKind: EmployeeKind.DEV,
        name: 'Shy Frontend Developer',
        count: 1,
        cost: 2,
        efficiency: 1
    },
    {
        id: 42,
        kind: CardKind.EMPLOYEE,
        employeeKind: EmployeeKind.HR,
        name: 'Office Manager',
        count: 2,
        cost: 3
    },
    {
        id: 43,
        kind: CardKind.EMPLOYEE,
        employeeKind: EmployeeKind.HR,
        name: 'Rockstar Recruiter',
        count: 2,
        cost: 3
    },
    {
        id: 44,
        kind: CardKind.EMPLOYEE,
        employeeKind: EmployeeKind.HR,
        name: 'Undercover HR Agent',
        count: 2,
        cost: 3
    },
    {
        id: 45,
        kind: CardKind.EMPLOYEE,
        employeeKind: EmployeeKind.HR,
        name: 'The Nice HR Lady',
        count: 1,
        cost: 2,
        burnoutResistance: 1
    },
    {
        id: 46,
        kind: CardKind.EMPLOYEE,
        employeeKind: EmployeeKind.HR,
        name: 'The Nice HR Guy',
        count: 1,
        cost: 2,
        burnoutResistance: 1
    },
    {
        id: 56,
        kind: CardKind.EMPLOYEE,
        employeeKind: EmployeeKind.SCRUM,
        name: 'Scrum Master',
        count: 2,
        cost: 4,
        burnoutResistance: 1
    }
];

// Knowledge Cards
export const knowledgeCardTypes: KnowledgeCardType[] = [
    {
        id: 57,
        kind: CardKind.KNOWLEDGE,
        name: 'Clean Code',
        count: 1,
        cost: 1,
        efficiency: 2
    },
    {
        id: 58,
        kind: CardKind.KNOWLEDGE,
        name: 'Design Patterns',
        count: 1,
        cost: 2,
        efficiency: 3
    },
    {
        id: 59,
        kind: CardKind.KNOWLEDGE,
        name: 'Polymorphism',
        count: 1,
        cost: 1,
        efficiency: 2
    },
    {
        id: 60,
        kind: CardKind.KNOWLEDGE,
        name: 'Defensive Programming',
        count: 1,
        cost: 1,
        efficiency: 2
    },
    {
        id: 61,
        kind: CardKind.KNOWLEDGE,
        name: 'TDD',
        count: 1,
        cost: 4,
        efficiency: 5
    },
    {
        id: 62,
        kind: CardKind.KNOWLEDGE,
        name: 'Unit Tests',
        count: 1,
        cost: 3,
        efficiency: 4
    },
    {
        id: 63,
        kind: CardKind.KNOWLEDGE,
        name: 'SOLID',
        count: 1,
        cost: 2,
        efficiency: 3
    },
    {
        id: 75,
        kind: CardKind.KNOWLEDGE,
        name: 'Version Control',
        count: 1,
        cost: 1,
        efficiency: 2
    },
    {
        id: 76,
        kind: CardKind.KNOWLEDGE,
        name: 'Domain Knowledge',
        count: 1,
        cost: 3,
        efficiency: 4
    },
    {
        id: 77,
        kind: CardKind.KNOWLEDGE,
        name: 'Dependency Injection',
        count: 1,
        cost: 2,
        efficiency: 3
    },
    {
        id: 78,
        kind: CardKind.KNOWLEDGE,
        name: 'Debugging',
        count: 1,
        cost: 2,
        efficiency: 3
    },
    {
        id: 80,
        kind: CardKind.KNOWLEDGE,
        name: 'Continuous Integration',
        count: 1,
        cost: 3,
        efficiency: 4
    }
]

// Action Cards
export const actionCardTypes : CardType[] = [
    {
        id: 79,
        kind: CardKind.ACTION,
        name: 'Outsourcing',
        count: 2,
        cost: 2
    },
    {
        id: 81,
        kind: CardKind.ACTION,
        name: 'Investor',
        count: 4,
        cost: 0
    },
    {
        id: 92,
        kind: CardKind.ACTION,
        name: 'Head Hunter',
        count: 1,
        cost: 5
    },
    {
        id: 93,
        kind: CardKind.ACTION,
        name: 'Coffee Machine',
        count: 1,
        cost: 2
    },
    {
        id: 94,
        kind: CardKind.ACTION,
        name: 'Vacation Time',
        count: 2,
        cost: 3
    },
    {
        id: 95,
        kind: CardKind.ACTION,
        name: 'Crunch Time',
        count: 1,
        cost: 2
    },
    {
        id: 96,
        kind: CardKind.ACTION,
        name: 'Technical Debt',
        count: 1,
        cost: 4
    },
    {
        id: 97,
        kind: CardKind.ACTION,
        name: 'Monster Bug',
        count: 2,
        cost: 3
    }
]