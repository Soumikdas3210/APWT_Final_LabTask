import { useContext, useState, useCallback } from 'react';
import { StudentContext } from '../context/StudentContext';
import Notification from './Notification';

const COURSE_COLORS = ['#4f46e5', '#0891b2', '#c2410c', '#15803d', '#be185d', '#7c3aed'];

interface FormValues {
  name: string;
  id: string;
  major: string;
  gpa: string;
  courses: string;
}

const EMPTY_FORM: FormValues = {
  name: '',
  id: '',
  major: '',
  gpa: '',
  courses: '',
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

function AddStudentForm() {
  const { students, addStudent } = useContext(StudentContext);
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange =
    (field: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;
      setValues((previous) => ({ ...previous, [field]: nextValue }));
      setErrors((previous) => ({ ...previous, [field]: undefined }));
    };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = 'Full name is required.';
    }

    if (!values.id.trim()) {
      nextErrors.id = 'Student ID is required.';
    } else if (!/^\d{2}-\d{5}-\d$/.test(values.id.trim())) {
      nextErrors.id = 'Use the format 23-51709-2.';
    } else if (students.some((student) => student.id === values.id.trim())) {
      nextErrors.id = 'This student ID already exists.';
    }

    if (!values.major.trim()) {
      nextErrors.major = 'Major is required.';
    }

    if (!values.gpa.trim()) {
      nextErrors.gpa = 'GPA is required.';
    } else if (Number.isNaN(Number(values.gpa))) {
      nextErrors.gpa = 'GPA must be a number.';
    } else if (Number(values.gpa) < 0 || Number(values.gpa) > 4) {
      nextErrors.gpa = 'GPA must be between 0 and 4.0.';
    }

    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const name = values.name.trim();
    const courses = values.courses
      .split(',')
      .map((course) => course.trim())
      .filter(Boolean)
      .map((course, index) => ({
        name: course,
        color: COURSE_COLORS[index % COURSE_COLORS.length],
      }));

    addStudent({
      id: values.id.trim(),
      name,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=4f46e5`,
      gpa: Number(values.gpa),
      major: values.major.trim(),
      credits: 0,
      courses,
    });

    setValues(EMPTY_FORM);
    setSuccessMessage(`${name} was added to the dashboard.`);
  };

  const dismissNotification = useCallback(() => setSuccessMessage(''), []);

  return (
    <section className="form-card">
      <h2 className="form-title">Add student</h2>
      <p className="form-subtitle">New records appear on the dashboard immediately.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label className="form-label" htmlFor="name">Full name</label>
          <input
            id="name"
            className={errors.name ? 'form-input form-input-invalid' : 'form-input'}
            type="text"
            value={values.name}
            onChange={handleChange('name')}
            placeholder="Mahmudul Hasan"
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="id">Student ID</label>
          <input
            id="id"
            className={errors.id ? 'form-input form-input-invalid' : 'form-input'}
            type="text"
            value={values.id}
            onChange={handleChange('id')}
            placeholder="23-51709-2"
          />
          {errors.id && <p className="form-error">{errors.id}</p>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="major">Major</label>
          <input
            id="major"
            className={errors.major ? 'form-input form-input-invalid' : 'form-input'}
            type="text"
            value={values.major}
            onChange={handleChange('major')}
            placeholder="Computer Science"
          />
          {errors.major && <p className="form-error">{errors.major}</p>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="gpa">GPA</label>
          <input
            id="gpa"
            className={errors.gpa ? 'form-input form-input-invalid' : 'form-input'}
            type="text"
            value={values.gpa}
            onChange={handleChange('gpa')}
            placeholder="3.75"
          />
          {errors.gpa && <p className="form-error">{errors.gpa}</p>}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="courses">Courses</label>
          <input
            id="courses"
            className="form-input"
            type="text"
            value={values.courses}
            onChange={handleChange('courses')}
            placeholder="Data Structures, Web Technology"
          />
          <p className="form-hint">Separate course names with commas.</p>
        </div>

        <button type="submit" className="submit-button">Add student</button>
      </form>

      {successMessage && (
        <Notification message={successMessage} onDismiss={dismissNotification} />
      )}
      
    </section>
  );
}

export default AddStudentForm;