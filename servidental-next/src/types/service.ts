export interface MaintenanceService {
    name: string
    duration: string
    description?: string
  }
  
  export interface ServiceActivity {
    name: string
    description?: string
    icon?: string
  }
  
  export interface ServiceFeature {
    title: string
    description: string
    image?: string
  }
  
  export interface Warranty {
    duration: string
    description: string
    conditions: string[]
  }