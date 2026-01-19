import React from 'react';

interface TaskVerdictProps {
    taskName: string;
    outcome: 'automate' | 'augment' | 'diy';
    onReset: () => void;
}

const TaskVerdict: React.FC<TaskVerdictProps> = ({ taskName, outcome, onReset }) => {
    const outcomes = {
        automate: {
            title: 'AUTOMATION HIGHLY FEASIBLE',
            color: 'text-[#33ff00]',
            bgColor: 'bg-[#33ff00]/10',
            borderColor: 'border-[#33ff00]',
            description: 'This task meets all criteria for full systemization. The ROI on building or buying an automated solution is high.'
        },
        augment: {
            title: 'AUGMENTATION RECOMMENDED',
            color: 'text-[#ffb000]',
            bgColor: 'bg-[#ffb000]/10',
            borderColor: 'border-[#ffb000]',
            description: 'Human judgment or complex steps are required. Enhance efficiency with specialized tools while keeping a pilot in the seat.'
        },
        diy: {
            title: 'MANUAL OPERATION PREFERRED',
            color: 'text-[#ff3333]',
            bgColor: 'bg-[#ff3333]/10',
            borderColor: 'border-[#ff3333]',
            description: 'The risk, infrequency, or subjective nature of this task makes automation too costly or dangerous. Stick to the traditional method.'
        }
    };

    const current = outcomes[outcome as keyof typeof outcomes];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4 font-vt323 animate-in slide-in-from-bottom-5 duration-700">
            <div className={`border-2 ${current.borderColor} ${current.bgColor} p-4 rounded-lg bg-black/90 shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <div className={`${current.color} text-sm opacity-70`}>ASSESSMENT VERDICT FOR: {taskName.toUpperCase()}</div>
                        <h2 className={`${current.color} text-2xl font-bold tracking-tight`}>{current.title}</h2>
                    </div>
                    <button
                        onClick={onReset}
                        className={`${current.color} opacity-60 hover:opacity-100 transition-all text-xl`}
                    >
                        [X]
                    </button>
                </div>

                <p className="text-white/80 text-lg leading-tight mb-4 italic">
                    "{current.description}"
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={onReset}
                        className={`flex-1 border border-current ${current.color} py-2 text-lg hover:bg-white/5 transition-all`}
                    >
                        [NEW ASSESSMENT]
                    </button>
                    <a
                        href="#contact"
                        className={`flex-1 bg-current ${current.borderColor} text-black font-bold py-2 text-lg text-center hover:opacity-90 transition-all`}
                    >
                        [GENETIC AUDIT]
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TaskVerdict;
