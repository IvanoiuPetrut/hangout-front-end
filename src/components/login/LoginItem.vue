<template>
  <div class="form-control mb-4">
    <label class="label" for="input1"><span class="label-text">Email</span></label>
    <input
      type="email"
      placeholder="Email Address"
      class="input input-bordered input-primary"
      required
      id="input1"
    />
  </div>
  <div class="form-control">
    <label class="label" for="input2"><span class="label-text">Password</span></label>
    <input
      type="password"
      placeholder="Password"
      class="input input-bordered input-primary"
      required
      for="input2"
    />
    <label class="label"
      ><button class="label-text-alt link link-hover">Forgot password?</button></label
    >
  </div>
  <div class="form-control mt-6"><button class="btn btn-primary">Login</button></div>
  <span class="label-text-alt link link-hover text-sm"
    >Need account? <strong>Register</strong></span
  >
</template>
