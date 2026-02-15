const InputField = ({ label, type = "text", name, value, onChange }) => (
    <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block' }}>{label}:</label>
        <input type={type} name={name} value={value} onChange={onChange} required />
    </div>
);
export default InputField;