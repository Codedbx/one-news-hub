<?php
namespace App\Repositories\Interfaces;

interface UserPreferenceRepositoryInterface {
    /**
     * Get user preferences by user ID.
     *
     * @param int $userId
     * @return array
     */
    public function getUserPreferences(int $userId): array;

    /**
     * Save user preferences (create or update).
     *
     * @param int $userId
     * @param array $preferences
     * @return bool
     */
    public function saveUserPreferences(int $userId, array $preferences): bool;

    /**
     * Delete user preferences by user ID.
     *
     * @param int $userId
     * @return bool
     */
    public function deleteUserPreferences(int $userId): bool;
}
