<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use App\Models\Role;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Image;


class ImageController extends Controller
{
    public function uploadImage(Request $request) {

        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:15000',
        ]);

        $uuid = Str::orderedUuid();
        $imageName = $uuid . '.jpg';

        $img = Image::make($request->file->path());

        $img = $img->resize(1500, 1100, function ($constraint) {
            $constraint->aspectRatio();
        })->encode('jpg', 85);

        sleep(1);

        Storage::disk('s3')->put('vehicle-images/' . $imageName, $img->stream()->__toString());
        $path = Storage::disk('s3')->url('vehicle-images/' . $imageName);
        return $path;
    }
}
