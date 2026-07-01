import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../shared/hooks/useAppSelector";

export function ProfilePage() {
    const user = useAppSelector((state) => state.auth.user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <section className="profile-page">
            <div className="page-heading">
                <h1>Профиль пользователя</h1>
            </div>

            <div className="profile-card">
                <div className="profile-card__avatar-wrapper">
                    <img
                        className="profile-card__avatar"
                        src={user.image}
                        alt={`${user.firstName} ${user.lastName}`}
                    />
                </div>

                <div className="profile-card__content">
                    <h2>
                        {user.firstName} {user.lastName}
                    </h2>

                    <div className="profile-info">
                        <div className="profile-info__item">
                            <span>Username</span>
                            <strong>{user.username}</strong>
                        </div>

                        <div className="profile-info__item">
                            <span>Email</span>
                            <strong>{user.email}</strong>
                        </div>

                        <div className="profile-info__item">
                            <span>Gender</span>
                            <strong>{user.gender}</strong>
                        </div>

                        <div className="profile-info__item">
                            <span>User ID</span>
                            <strong>{user.id}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}