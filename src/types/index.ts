export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  lastActive: string;
}

export type UserRole = 
  | 'admin'
  | 'construction_manager'
  | 'engineer'
  | 'driver'
  | 'client';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  estimatedEndDate: string;
  progress: number;
  budget: number;
  spent: number;
  location: string;
  manager: string;
  teamMembers: string[];
  tags: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  updatedAt: string;
}

export type ProjectStatus = 
  | 'planning'
  | 'active'
  | 'delayed'
  | 'on_hold'
  | 'completed'
  | 'cancelled';

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  dueDate: string;
  completedAt?: string;
  estimatedHours: number;
  actualHours?: number;
  tags: string[];
  dependencies: string[];
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 
  | 'pending'
  | 'in_progress'
  | 'review'
  | 'completed'
  | 'blocked';

export interface Vehicle {
  id: string;
  type: VehicleType;
  licensePlate: string;
  model: string;
  year: number;
  status: VehicleStatus;
  currentLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  driverId?: string;
  capacity: {
    weight: number;
    volume: number;
  };
  maintenanceDate: string;
  fuelLevel?: number;
  createdAt: string;
  updatedAt: string;
}

export type VehicleType = 
  | 'truck'
  | 'excavator'
  | 'bulldozer'
  | 'crane'
  | 'mixer'
  | 'dump_truck'
  | 'loader'
  | 'van';

export type VehicleStatus = 
  | 'available'
  | 'in_use'
  | 'maintenance'
  | 'out_of_service';

export interface Delivery {
  id: string;
  projectId: string;
  vehicleId: string;
  driverId: string;
  status: DeliveryStatus;
  scheduledDate: string;
  completedDate?: string;
  pickupLocation: {
    address: string;
    lat: number;
    lng: number;
  };
  deliveryLocation: {
    address: string;
    lat: number;
    lng: number;
  };
  items: DeliveryItem[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type DeliveryStatus = 
  | 'scheduled'
  | 'picked_up'
  | 'in_transit'
  | 'delivered'
  | 'failed'
  | 'cancelled';

export interface DeliveryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  weight?: number;
  description?: string;
}

export interface Document {
  id: string;
  projectId: string;
  name: string;
  type: DocumentType;
  url: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  version: number;
  tags: string[];
  description?: string;
}

export type DocumentType = 
  | 'drawing'
  | 'permit'
  | 'report'
  | 'contract'
  | 'invoice'
  | 'photo'
  | 'specification'
  | 'other';

export interface Issue {
  id: string;
  projectId: string;
  title: string;
  description: string;
  type: IssueType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: IssueStatus;
  reportedBy: string;
  assignedTo?: string;
  createdAt: string;
  resolvedAt?: string;
  attachments: string[];
}

export type IssueType = 
  | 'safety'
  | 'quality'
  | 'delay'
  | 'equipment'
  | 'material'
  | 'weather'
  | 'other';

export type IssueStatus = 
  | 'open'
  | 'in_progress'
  | 'resolved'
  | 'closed';

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  delayedProjects: number;
  totalVehicles: number;
  availableVehicles: number;
  activeDeliveries: number;
  pendingTasks: number;
  openIssues: number;
  totalBudget: number;
  spentBudget: number;
  efficiency: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

/**
 * Design System Types
 * Based on the professional UI/UX design prompt
 */

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  // Primary palette
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string; // Deep Blue (#1E3A8A)
    900: string;
  };
  // Secondary palette (Construction orange)
  accent: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string; // Orange (#F97316)
    600: string;
    700: string;
    800: string;
    900: string;
  };
  // Earth tones for construction theme
  earth: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  // Feedback colors
  success: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  warning: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  danger: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  background: string; // Light Gray (#F3F4F6)
}

// Typography configuration
export interface ThemeTypography {
  fontFamily: {
    heading: string; // Poppins or Montserrat
    body: string;    // Inter or Roboto
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

// Spacing for 8px grid system
export interface ThemeSpacing {
  xs: string;  // 4px
  sm: string;  // 8px
  md: string;  // 16px
  lg: string;  // 24px
  xl: string;  // 32px
  '2xl': string; // 48px
  '3xl': string; // 64px
}

// Breakpoints for responsive design
export interface ThemeBreakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

// Shadow styles
export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  dropdown: string;
  'button-3d': string;
  'button-active': string;
  construction: string; // Special shadow for construction theme
}

// Border radius
export interface ThemeBorderRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

// Animation timing
export interface ThemeAnimation {
  fast: string;
  normal: string;
  slow: string;
}

// Complete theme configuration
export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  breakpoints: ThemeBreakpoints;
  shadows: ThemeShadows;
  borderRadius: ThemeBorderRadius;
  animation: ThemeAnimation;
}
