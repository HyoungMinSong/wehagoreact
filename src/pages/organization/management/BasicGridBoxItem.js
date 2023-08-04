function BasicGridBoxItem(props) {
  const user = props.user;
  return (
    <tr
    key={user.t_user_no}
    onClick={() => props.handleRowClick(user)}
    className={props.selectedUser === user ? "selectedRow" : ""}
  >
    <td onClick={(e) => e.stopPropagation()}>
      <input
        type="checkbox"
        name="theChosenOnes"
        onChange={(e) => props.chosenOnes(e, user)}
        disabled={
          user.t_employee_state !== 0 &&
          user.t_employee_state !== 1
        }
      />
    </td>
    <td>{user.t_user_name}</td>
    <td>{user.t_organization_name}</td>
    <td>{user.t_employee_position}</td>
    <td>{user.t_user_email}</td>
    <td>{user.t_user_phone}</td>
    <td>{user.t_employee_date}</td>
    <td>
      {user.t_employee_state === 0 && "미가입"}
      {user.t_employee_state === 1 && "가입대기"}
      {user.t_employee_state === 2 && "사용중"}
      {user.t_employee_state === 3 && "사용중지"}
      {user.t_employee_state === -1 && "퇴사"}
    </td>
  </tr>
  );
}

export default BasicGridBoxItem;