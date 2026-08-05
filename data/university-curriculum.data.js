// ===== University > Curriculum module — หลักสูตรนิติศาสตรบัณฑิต 2565 (ส่วนภูมิภาค) ม.รามคำแหง =====
// รหัสวิชา+หน่วยกิตจากแบบตรวจสอบหลักสูตรฉบับทางการ, ไม่มีชื่อวิชาเต็ม (ไม่มีในเอกสารต้นทาง)
// แก้ status/grade/note ตรงนี้เวลา Bright แจ้งผลสอบในแชท (ไม่มี UI แก้ในแอป — read-only เหมือน Furniture/Habit)
// ตั้งชื่อตัวแปร prefix UNIVERSITY_ ไว้ตั้งแต่ต้น เผื่อโมดูล Schedule/Notes ที่จะเพิ่มทีหลัง (window.UNIVERSITY_SCHEDULE ฯลฯ)
window.UNIVERSITY_CURRICULUM_UPDATED = '2026-08-05';
window.UNIVERSITY_CURRICULUM_DATA = {
  program: {
    name: 'นิติศาสตรบัณฑิต 2565',
    note: 'สำหรับนักศึกษาส่วนภูมิภาค คณะนิติศาสตร์ มหาวิทยาลัยรามคำแหง',
    totalCredits: 140
  },
  categories: [
    { key: 'gened', label: 'General Education', credits: 30 },
    { key: 'required', label: 'Major — Required', credits: 92 },
    { key: 'elective', label: 'Major — Law Elective', credits: 12 },
    { key: 'free', label: 'Free Elective', credits: 6 }
  ],
  courses: [
    // ── หมวดวิชาศึกษาทั่วไป 30 หน่วยกิต ──
    { id: 'cr0001', code: 'RAM1103', category: 'gened', credits: 3, status: 'passed', grade: 'D', term: '1/2568', note: '' },
    { id: 'cr0002', code: 'RAM1111', category: 'gened', credits: 3, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0003', code: 'RAM1112', category: 'gened', credits: 3, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0004', code: 'RAM1132', category: 'gened', credits: 3, status: 'passed', grade: 'C+', term: '1/2568', note: '' },
    { id: 'cr0005', code: 'RAM1141', category: 'gened', credits: 3, status: 'passed', grade: 'B', term: '1/2568', note: '' },
    { id: 'cr0006', code: 'RAM1203', category: 'gened', credits: 3, status: 'passed', grade: 'C+', term: '1/2568', note: '' },
    { id: 'cr0007', code: 'RAM1213', category: 'gened', credits: 3, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0008', code: 'RAM1301', category: 'gened', credits: 3, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0009', code: 'RAM1303', category: 'gened', credits: 3, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0010', code: 'RAM1312', category: 'gened', credits: 3, status: 'todo', grade: '', term: '', note: '' },

    // ── หมวดวิชาเฉพาะ 2.1 กลุ่มวิชาบังคับ 92 หน่วยกิต ──
    { id: 'cr0011', code: 'LAW1101', category: 'required', credits: 2, status: 'passed', grade: 'D', term: '3/2568', note: '' },
    { id: 'cr0012', code: 'LAW1102', category: 'required', credits: 2, status: 'passed', grade: 'C', term: '1/2568', note: '' },
    { id: 'cr0013', code: 'LAW1103', category: 'required', credits: 3, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0014', code: 'LAW1106', category: 'required', credits: 3, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0015', code: 'LAW2101', category: 'required', credits: 3, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0016', code: 'LAW2102', category: 'required', credits: 3, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0017', code: 'LAW2103', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0018', code: 'LAW2104', category: 'required', credits: 3, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0019', code: 'LAW2105', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0020', code: 'LAW2106', category: 'required', credits: 3, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0021', code: 'LAW2107', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0022', code: 'LAW2108', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0023', code: 'LAW2109', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0024', code: 'LAW2110', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0025', code: 'LAW2111', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0026', code: 'LAW2112', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0027', code: 'LAW2113', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0028', code: 'LAW3101', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0029', code: 'LAW3102', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0030', code: 'LAW3103', category: 'required', credits: 3, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0031', code: 'LAW3104', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0032', code: 'LAW3105', category: 'required', credits: 3, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0033', code: 'LAW3106', category: 'required', credits: 3, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0034', code: 'LAW3107', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0035', code: 'LAW3108', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0036', code: 'LAW3109', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0037', code: 'LAW3110', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0038', code: 'LAW3111', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0039', code: 'LAW3112', category: 'required', credits: 3, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0040', code: 'LAW3117', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0041', code: 'LAW4101', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0042', code: 'LAW4102', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0043', code: 'LAW4103', category: 'required', credits: 3, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0044', code: 'LAW4104', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0045', code: 'LAW4105', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0046', code: 'LAW4106', category: 'required', credits: 3, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0047', code: 'LAW4107', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0048', code: 'LAW4108', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0049', code: 'LAW4109', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0050', code: 'LAW4110', category: 'required', credits: 2, status: 'todo', grade: '', term: '', note: '' },

    // ── หมวดวิชาเฉพาะ 2.2 กลุ่มวิชาเลือกกฎหมาย 12 หน่วยกิต ──
    { id: 'cr0051', code: 'LAW3133', category: 'elective', credits: 3, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0052', code: 'LAW3138', category: 'elective', credits: 3, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0053', code: 'LAW4134', category: 'elective', credits: 3, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0054', code: 'LAW4156', category: 'elective', credits: 3, status: 'todo', grade: '', term: '', note: '' },

    // ── หมวดวิชาเลือกเสรี 6 หน่วยกิต — เลือกวิชาใดก็ได้ที่เปิดสอน ณ สาขาวิทยบริการ (ยังไม่กำหนดรหัส รอ Bright เลือกเอง) ──
    { id: 'cr0055', code: '', category: 'free', credits: 3, status: 'todo', grade: '', term: '', note: '' },
    { id: 'cr0056', code: '', category: 'free', credits: 3, status: 'todo', grade: '', term: '', note: '' }
  ]
};
