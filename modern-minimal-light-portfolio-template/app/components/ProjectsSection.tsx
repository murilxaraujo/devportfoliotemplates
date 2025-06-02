'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
	{
		id: 1,
		title: 'Pinterest',
		description: 'A modern e-commerce platform built with Next.js and Stripe',
		image: '/code.jpg',
	},
	{
		id: 2,
		title: 'C6 Bank + JP Morgan Chase',
		description: 'Real-time chat application powered by OpenAI',
		image: '/laptop.jpg',
	},
	{
		id: 3,
		title: 'Itaú',
		description: 'Collaborative task management tool with real-time updates',
		image: '/code.jpg',
	},
	{
		id: 4,
		title: 'Porto Seguro',
		description: 'Dynamic portfolio generator for developers',
		image: '/laptop.jpg',
	},
	{
		id: 5,
		title: 'Studio Onze',
		description: 'Dynamic portfolio generator for developers',
		image: '/laptop.jpg',
	},
	{
		id: 6,
		title: 'Rede',
		description: 'Dynamic portfolio generator for developers',
		image: '/laptop.jpg',
	},
];

export default function ProjectsSection() {
	return (
		<section className="py-12 md:py-20 px-4 max-w-7xl mx-auto">
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-gray-800"
			>
				Featured Projects
			</motion.h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{projects.map((project) => (
					<motion.div
						key={project.id}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: project.id * 0.1 }}
						whileHover={{ scale: 1.02 }}
						className="group relative aspect-video bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] transition-all duration-300"
					>
						<Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
						<div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90 group-hover:to-black/95 transition-colors duration-300" />
						<div className="absolute inset-0 p-6 flex flex-col justify-end">
							<h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
							<p className="text-gray-200 mb-4 line-clamp-2">{project.description}</p>
							<div className="flex gap-4">
								<Link
									href="#"
									className="text-sm px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 backdrop-blur-sm"
								>
									View Project
								</Link>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}
