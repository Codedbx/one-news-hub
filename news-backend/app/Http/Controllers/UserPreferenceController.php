<?php

namespace App\Http\Controllers;

use App\Models\UserPreference;
use App\Services\UserPreferenceService;
use App\Transformers\UtilResource;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class UserPreferenceController extends Controller
{

    protected $userPreferenceService;

    public function __construct(UserPreferenceService $userPreferenceService)
    {
        $this->userPreferenceService = $userPreferenceService;
    }
    public function show($userId)
    {
        try {
            $userPreferences = $this->userPreferenceService->getUserPreferences($userId);
            if (!$userPreferences) {
                throw new ModelNotFoundException('User preferences not found.');
            }
            return new UtilResource($userPreferences, false, 200);
        } catch (ModelNotFoundException $e) {
            return new UtilResource($e->getMessage(), true, 404);
        } catch (\Exception $e) {
            return new UtilResource('An error occurred.', true, 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'sources' => 'nullable|array',
                'categories' => 'nullable|array',
                'authors' => 'nullable|array',
            ]);

            $userId = Auth::id();

            $result = $this->userPreferenceService->saveUserPreferences($userId, $validatedData);
            if (!$result) {
                throw new ModelNotFoundException('Failed to update user preferences.');
            }
            return new UtilResource("Updated successfully", false, 200);
        } catch (ModelNotFoundException $e) {
            return new UtilResource($e->getMessage(), true, 404);
        } catch (\Exception $e) {
            return new UtilResource('An error occurred.', true, 500);
        }
    }

    public function destroy($userId)
    {
        try {
            $result = $this->userPreferenceService->deleteUserPreferences($userId);
            if (!$result) {
                throw new ModelNotFoundException('User preferences not found.');
            }
            return new UtilResource("Deleted successfully", false, 204);
        } catch (ModelNotFoundException $e) {
            return new UtilResource($e->getMessage(), true, 404);
        } catch (\Exception $e) {
            return new UtilResource('An error occurred.', true, 500);
        }
    }
}