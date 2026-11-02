/**
 * Sample data for the BrightBase product mocks in the case-study header.
 *
 * All of it is invented. It must never be replaced with real customer
 * records — the mocks carry a visible "sample data" badge on that promise.
 */

export const dashStats = [
  { key: 'CLOSE RATE', value: '62%', sub: '5 of 8 quotes' },
  { key: 'RECURRING', value: '97%', sub: 'of visits' },
  { key: 'ASSIGNED', value: '96%', sub: 'visits with a cleaner' },
] as const;

export const weekBars = [
  { day: 'Mon', height: 62 },
  { day: 'Tue', height: 80 },
  { day: 'Wed', height: 70 },
  { day: 'Thu', height: 92 },
  { day: 'Fri', height: 85 },
  { day: 'Sat', height: 100, highlight: true },
  { day: 'Sun', height: 30 },
] as const;

export const todayJobs = [
  { time: '8:00', place: 'Standard clean · Kennebunk', crew: 'Crew A · residential', status: 'Done', bg: '#e3f4ea', fg: '#22744a' },
  { time: '10:00', place: 'Turnover · Harbor Cottage, Wells', crew: 'Alex · vacation rental', status: 'En route', bg: '#e1f3f7', fg: '#0e7490' },
  { time: '12:30', place: 'Office clean · Biddeford', crew: 'Crew B · commercial', status: 'Scheduled', bg: '#fbf1dc', fg: '#8a5a0b' },
  { time: '2:00', place: 'Deep clean · Saco', crew: 'Open — up for grabs', status: 'Unassigned', bg: '#f0f1f5', fg: '#595d6c' },
] as const;

export const phoneStats = [
  { value: '$420', key: 'this week' },
  { value: '1', key: 'up for grabs' },
  { value: '2', key: 'messages' },
] as const;

export const propertyChips = ['3 bed', '2 bath', 'Linens on site', 'No pets'] as const;

export const propertyRows = [
  { key: 'Access', value: 'Lockbox · code shown on arrival' },
  { key: 'Parking', value: 'Driveway, left side' },
  { key: 'Host note', value: 'Restock coffee pods; strip all beds' },
] as const;

export const phoneTabs = [
  { label: 'Today', active: true },
  { label: 'Schedule', active: false },
  { label: 'Chat', active: false },
  { label: 'Learn', active: false },
  { label: 'Me', active: false },
] as const;
