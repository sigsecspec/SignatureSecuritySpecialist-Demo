import type { TrainingModule } from '../types';

export const trainingModules: TrainingModule[] = [
    {
        id: 'unarmed-sec',
        title: 'Unarmed Security Principles',
        description: 'Covers fundamental security procedures, observation skills, and incident reporting for unarmed officers.',
        missionType: 'Unarmed',
    },
    {
        id: 'armed-sec',
        title: 'Armed Security & Firearms',
        description: 'Advanced training on firearm safety, use of force policies, and marksmanship for armed personnel.',
        missionType: 'Armed',
    },
    {
        id: 'retail-sec',
        title: 'Retail Security & Loss Prevention',
        description: 'Covers loss prevention, customer service, and responding to incidents in a retail environment.',
        missionType: 'Retail',
    },
    {
        id: 'bar-sec',
        title: 'Bar & Nightclub Security',
        description: 'Focuses on ID verification, crowd management, de-escalation techniques, and local regulations.',
        missionType: 'Bar/Nightclub',
    },
    {
        id: 'event-sec',
        title: 'Event Security Operations',
        description: 'Training for large-scale events, including access control, crowd flow, and emergency response.',
        missionType: 'Event',
    },
    {
        id: 'corporate-sec',
        title: 'Corporate Security Protocols',
        description: 'Protocols for corporate environments, including access control, visitor logging, and executive protection concepts.',
        missionType: 'Corporate',
    },
    {
        id: 'residential-sec',
        title: 'Residential & Community Security',
        description: 'Covers gate access, patrol techniques, and resident relations for residential communities.',
        missionType: 'Residential',
    },
    {
        id: 'construction-sec',
        title: 'Construction Site Security',
        description: 'Focuses on site access control, equipment protection, and safety protocols for construction environments.',
        missionType: 'Construction',
    },
    {
        id: 'crowd-control',
        title: 'Crowd Control Specialist',
        description: 'Advanced techniques in managing large crowds, identifying potential threats, and de-escalation.',
        missionType: 'Specialization',
    },
    {
        id: 'surveillance-monitoring',
        title: 'Surveillance Monitoring',
        description: 'Training on CCTV operation, identifying suspicious behavior, and documenting events.',
        missionType: 'Specialization',
    },
    {
        id: 'emergency-response',
        title: 'Emergency Response (First Aid/CPR)',
        description: 'Certification in First Aid, CPR, and AED usage for emergency medical situations.',
        missionType: 'Specialization',
    },
    {
        id: 'customer-service',
        title: 'Customer Service Excellence',
        description: 'Skills for providing excellent customer service in a security context, enhancing client relations.',
        missionType: 'Specialization',
    }
];