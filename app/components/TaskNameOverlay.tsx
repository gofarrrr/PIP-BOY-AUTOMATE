import React, { useState } from 'react';

interface TaskNameOverlayProps {
    onStart: (name: string) => void;
    onCancel: () => void;
}

const TaskNameOverlay: React.FC<TaskNameOverlayProps> = ({ onStart, onCancel }) => {
    const [taskName, setTaskName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskName.trim()) {
            onStart(taskName);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4 font-vt323 backdrop-blur-sm">
            <div className="max-w-md w-full border-2 border-[#33ff00] bg-black p-6 rounded-sm shadow-[0_0_30px_rgba(51,255,0,0.2)]">
                <h2 className="text-[#33ff00] text-3xl mb-4 text-center tracking-wider">INITIATING TASK ASSESSMENT</h2>
                <p className="text-[#33ff00]/70 text-lg mb-6 text-center leading-tight">
                    Enter the name of the operation or workflow you wish to evaluate for automation readiness.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <span className="absolute -top-3 left-3 bg-black px-2 text-[#33ff00] text-sm font-bold">TASK_ID_V3</span>
                        <input
                            autoFocus
                            type="text"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            placeholder="e.g. Monthly Inventory Audit..."
                            className="w-full bg-black border-2 border-[#33ff00]/50 text-[#33ff00] p-4 text-2xl outline-none focus:border-[#33ff00] transition-all placeholder:text-[#33ff00]/20"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 border-2 border-[#33ff00]/50 text-[#33ff00]/70 py-3 text-xl hover:bg-[#33ff00]/10 hover:text-[#33ff00] transition-all"
                        >
                            [CANCEL]
                        </button>
                        <button
                            type="submit"
                            disabled={!taskName.trim()}
                            className="flex-1 bg-[#33ff00] text-black font-bold py-3 text-xl hover:bg-[#33ff00]/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-[#33ff00]"
                        >
                            [START_EVAL]
                        </button>
                    </div>
                </form>

                <div className="mt-6 flex justify-between text-xs text-[#33ff00]/40">
                    <span>SECURE PROTOCOL ACTIVE</span>
                    <span>ROBCO INDUSTRIES</span>
                </div>
            </div>
        </div>
    );
};

export default TaskNameOverlay;
