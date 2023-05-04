@props(['url', 'frontendUrl'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
<img src="https://laravel.com/img/notification-logo.png" class="logo" alt="Laravel Logo">
@else
<tr>
    <td class="header">
        <a href="{{ $url }}">
            <img src="{{ $frontendUrl }}/logo.png" class="logo" >
            <br/>
            {{ $slot }}
        </a>
    </td>
</tr>
@endif
</a>
</td>
</tr>
