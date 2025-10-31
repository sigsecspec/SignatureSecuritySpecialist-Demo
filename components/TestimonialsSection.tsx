
import React from 'react';
import type { Testimonial } from '../types';

const testimonials: Testimonial[] = [
    {
        quote: "The SSS platform has revolutionized how we schedule our security details. The transparency and real-time tracking are game-changers.",
        author: "John D., Corporate Client",
        role: "Client"
    },
    {
        quote: "As a guard, finding and claiming missions has never been easier. The instant confirmation and clear pay details are fantastic.",
        author: "Sarah K., Security Officer",
        role: "Guard"
    },
    {
        quote: "Managing multiple sites is seamless with their dashboard. The quality of guards is consistently high due to the training-based matching.",
        author: "Mike R., Event Manager",
        role: "Client"
    }
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-sss-sage">
        <p className="text-sss-grey italic mb-4">"{testimonial.quote}"</p>
        <p className="font-bold text-sss-ebony">{testimonial.author}</p>
        <p className="text-sm text-sss-sage">{testimonial.role}</p>
    </div>
);

const TestimonialsSection: React.FC = () => {
    return (
        <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-sss-ebony">What Our Partners Say</h2>
                    <p className="mt-4 text-lg text-sss-grey">Real feedback from the people who use our platform every day.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
