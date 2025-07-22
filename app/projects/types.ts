// app/projects/types.ts
export interface Project {
  id: string
  title: string
  category: string
  description: string
  longDescription: string
  technologies: string[]
  status: string
  client: string
  duration: string
  year: string
  impact: Record<string, string>
  image: string
  gallery: string[]
  link: string
  featured: boolean
}

export interface ProjectsClientProps {
  projects: Project[]
  categories: string[]
  statuses: string[]
}