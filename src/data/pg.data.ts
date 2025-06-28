import TemplateType from "../types/pg";

export const templates: TemplateType[] = [
 {
  id: "1",
  name: "VM playground",
  pgname: "1vmpg",
  playground: "ubuntu2404n1",
  numofvms: 1,
  description: "A comprehensive playground with a ubuntu 24.04 virtual machine",
  image: "/img/2vm-pg-img.jpg",
  tags: ["Ubuntu", "Networking", "VMs"],
  resources: {
   cpu: "2 cores",
   memory: "4 GB",
   storage: "10 GB",
  },
 },
  {
  id: "2",
  name: "2 VM playground",
  pgname: "2vmpg",
  playground: "ubuntu2404n2",
  numofvms: 2,
  description: "A comprehensive playground with 2 ubuntu 24.04 virtual machine",
  image: "/img/2vm-pg-img.jpg",
  tags: ["Ubuntu", "Networking", "VMs"],
  resources: {
   cpu: "2 cores",
   memory: "4 GB",
   storage: "10 GB",
  },
 },
 {
  id: "3",
  name: "Docker playground",
  playground: "ubuntu2404n1-docker",
  pgname: "dockerpg",
  numofvms: 1,
  description: "A playground featuring a virtual machines pre-installed with Docker.",
  image:
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  tags: ["Ubuntu", "Docker", "VMs"],
  resources: {
   cpu: "2 cores",
   memory: "4 GB",
   storage: "10 GB",
  },
 },
 {
  id: "4",
  name: "Ansible playground",
  pgname: "3ansbl",
  playground: "ubuntu2404n3-ansible",
  numofvms: 3,
  description: "A playground featuring 3 virtual machines pre-installed with Ansible in one of them.",
  image:
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
  tags: ["Ubuntu", "Ansible", "linux"],
  resources: {
   cpu: "4 cores",
   memory: "8 GB",
   storage: "20 GB",
  },
 },
 {
  id: "5",
  name: "2 VM playground",
  pgname: "2almavms",
  playground: "ubuntu2404n2-docker",
  numofvms: 2,
  description: "A comprehensive playground with 2 Almalinux OS 9 virtual machines",
  image:
   "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  tags: ["Server", "Almalinux", "Advanced"],
  resources: {
   cpu: "4 cores",
   memory: "16 GB",
   storage: "30 GB",
  },
 },
];

export const usageHistory = [
 {
  id: "1",
  templateName: "Python Development",
  startTime: "2023-06-15 09:30",
  duration: "2h 15m",
  status: "completed" as const,
 },
 {
  id: "2",
  templateName: "Web Development",
  startTime: "2023-06-14 14:00",
  duration: "1h 45m",
  status: "completed" as const,
 },
 {
  id: "3",
  templateName: "Data Science",
  startTime: "2023-06-13 10:15",
  duration: "3h 20m",
  status: "completed" as const,
 },
 {
  id: "4",
  templateName: "Python Development",
  startTime: "Now",
  duration: "0h 45m",
  status: "active" as const,
 },
];