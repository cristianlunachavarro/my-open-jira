import React, { FC } from 'react';
import styles from './ProgressLine.module.css';

interface Props {
    status: string
}

const ProgressLine: FC<Props> = ({ status }) => {
    const progressLabels = ['pending', 'in-progress', 'finished'];
    const index = progressLabels.indexOf(status);

    const colorMap: Record<string, string> = {
        'pending': '#ff0000',
        'in-progress': '#ffa500',
        'finished': '#00ff00',
    };

    const color = colorMap[status] || '#ff0000';
    const progress = index !== -1 ? ((index + 1) / progressLabels.length) * 100 : 33;

    return (
        <div className={styles.timelineContainer}>
            <div className={styles.timeline}>
                <div className={styles.timelineProgress} style={{ width: `${progress}%`, background: color }} />
            </div>
        </div>
    );
};

export default ProgressLine;
